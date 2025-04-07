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
    const { chatId, content } = await req.json();

    if (!chatId || !content) {
      return new NextResponse("Missing chatId or content", { status: 400 });
    }

    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
    });

    if (!chat) {
      return new NextResponse("Chat not found", { status: 404 });
    }

    // Create the new message
    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        chatId,
      },
    });

    return NextResponse.json({ message });
  } catch (error) {
    console.error(error);
    return new NextResponse("Server error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
