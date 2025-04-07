import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const senderId = session.user.id;
    const { recipientId } = await req.json();

    if (!recipientId) {
      return new NextResponse("Missing recipientId", { status: 400 });
    }

    let chat = await prisma.chat.findFirst({
      where: {
        userIds: {
          hasEvery: [senderId, recipientId],
        },
      },
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          userIds: [senderId, recipientId],
        },
      });
    }

    return NextResponse.json({ chat });
  } catch (error) {
    console.error(error);
    return new NextResponse("Server error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = async (req) => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;

    const chats = await prisma.chat.findMany({
      where: {
        userIds: {
          has: userId,
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    const allUserIds = Array.from(
      new Set(chats.flatMap((chat) => chat.userIds))
    );

    const users = await prisma.user.findMany({
      where: {
        id: {
          in: allUserIds,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const userMap = Object.fromEntries(users.map((user) => [user.id, user]));

    const enrichedChats = chats.map((chat) => {
      const otherUsers = chat.userIds
        .filter((id) => id !== userId)
        .map((id) => userMap[id]);

      return {
        ...chat,
        participants: otherUsers,
      };
    });

    return NextResponse.json({ chats: enrichedChats });
  } catch (error) {
    console.error(error);
    return new NextResponse("Server error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
