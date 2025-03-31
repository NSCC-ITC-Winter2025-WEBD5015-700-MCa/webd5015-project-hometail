import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    const body = await req.json();

    const newDog = await prisma.dog.create({
      data: {
        name: body.dogName,
        breed: body.dogBreed,
        size: body.dogSize,
        activityLevel: body.activityLevel,
        goodWithKids: body.kidFriendly === "true", // Ensure boolean conversion
        shedding: body.sheddingLevel,
        maintenanceCost: body.costOfMaintenance,
        location: body.dogLocation,
        image: body.dogImage, // Assuming you're storing image URLs
      },
    });

    return NextResponse.json(newDog, { status: 201 });
  } catch (error) {
    console.error("Error listing dog:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
