import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req, { params }) => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;
    const { chatId } = params;

    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!chat || !chat.userIds.includes(userId)) {
      return new NextResponse(
        "Chat not found or user is not part of the chat",
        { status: 404 }
      );
    }

    return NextResponse.json({ messages: chat.messages });
  } catch (error) {
    console.error(error);
    return new NextResponse("Server error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
