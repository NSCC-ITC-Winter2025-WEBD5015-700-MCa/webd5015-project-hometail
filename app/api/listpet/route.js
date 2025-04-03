import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req) => {
  try {
    const body = await req.json();

    const { image, ...dogDetails } = body;

    let imageUrl = null;
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "ml_default",
      });
      imageUrl = uploadedResponse.secure_url;
    }

    const newDog = await prisma.dog.create({
      data: {
        ...dogDetails,
        image: imageUrl,
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
