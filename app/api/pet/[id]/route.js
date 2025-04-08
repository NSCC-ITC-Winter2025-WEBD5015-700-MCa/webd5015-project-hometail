// app/api/pet/[id]/route.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET a single dog by ID
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const dog = await prisma.dog.findUnique({
      where: { id },
    });
    if (!dog) return new Response("Dog not found", { status: 404 });

    return new Response(JSON.stringify(dog), { status: 200 });
  } catch (error) {
    return new Response("Error fetching dog", { status: 500 });
  }
}

// PATCH to update a dog's info
export async function PATCH(req, { params }) {
  const { id } = params;
  const body = await req.json();

  try {
    const updatedDog = await prisma.dog.update({
      where: { id },
      data: {
        name: body.name,
        breed: body.breed,
        size: body.size,
        activityLevel: body.activityLevel,
        goodWithKids: body.goodWithKids,
        temperament: body.temperament,
        shedding: body.shedding,
        maintenanceCost: body.maintenanceCost,
        location: body.location,
        image: body.image,
      },
    });

    return new Response(JSON.stringify(updatedDog), { status: 200 });
  } catch (error) {
    console.error("Error updating dog:", error);
    return new Response("Failed to update dog", { status: 500 });
  }
}
