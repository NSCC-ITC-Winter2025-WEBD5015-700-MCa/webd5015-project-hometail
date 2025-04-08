import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const pets = await prisma.dog.findMany({
      where: {
        isListed: true
      }
    });

    if (!pets || pets.length === 0) {
      return NextResponse.json({ message: "No pets found" }, { status: 404 });
    }

    return NextResponse.json(pets, { status: 200 });
  } catch (error) {
    console.error("Error fetching pets:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
