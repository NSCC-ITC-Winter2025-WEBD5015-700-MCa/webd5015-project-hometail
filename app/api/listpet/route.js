import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    const body = await req.json();

    // Log body for debugging
    console.log("Body received:", body);

    const newDog = await prisma.dog.create({
      data: {
        name: body.dogName,  // Ensure correct field name
        breed: body.dogBreed,
        size: body.dogSize,
        activityLevel: body.activityLevel,
        goodWithKids: body.kidFriendly,  // Should be a boolean (no need for conversion)
        shedding: body.sheddingLevel,
        maintenanceCost: body.costOfMaintenance,
        location: body.dogLocation,
        image: body.dogImage || null,  // Default to empty string if image is null
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
