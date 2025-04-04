import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const allDogs = await prisma.Dog.findMany(); // Make sure the model is correct in your Prisma schema
    return new Response(JSON.stringify(allDogs), { status: 200 });
  } catch (err) {
    console.error("Error fetching dogs:", err);
    return new Response(JSON.stringify({ message: "Error fetching dogs" }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
