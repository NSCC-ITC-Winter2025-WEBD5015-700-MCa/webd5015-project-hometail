import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PATCH = async (req, { params }) => {
  const { id } = params;

  try {
    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
