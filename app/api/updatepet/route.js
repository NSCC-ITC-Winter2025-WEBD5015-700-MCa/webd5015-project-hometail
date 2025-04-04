import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PATCH = async (req) => {
  try {
    const body = await req.json();
    const { dogId, updateData } = body;

    if (!dogId || !updateData) {
      return NextResponse.json({ message: "Missing dogId or update data" }, { status: 400 });
    }

    const updatedDog = await prisma.dog.update({
      where: { id: dogId },
      data: updateData,
    });

    return NextResponse.json(updatedDog, { status: 200 });
  } catch (error) {
    console.error("Error updating dog:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
