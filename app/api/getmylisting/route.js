import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export const GET = async () => {
  const session = await auth();

  
  try {

    if (!session) {
      return NextResponse.json({message: "Unauthorized Request"}, {status: 403})
    }
    
    const myListedPets = await prisma.Dog.findMany({
      where: {
        userId: session.user.id
      }
    });


    if (!myListedPets || myListedPets.length === 0) {
      return NextResponse.json({ message: "No pets found" }, { status: 404 });
    }

    return NextResponse.json(myListedPets, { status: 200 });
  } catch (error) {
    console.error("Error fetching pets:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
