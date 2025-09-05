import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const DELETE = async (request, { params }) => {
  const id = await params.id;

  try {
    const existingWish = await prisma.wish.findUnique({
      where: { id },
    });

    if (!existingWish) {
      return NextResponse.json(
        { error: "Wish cannot be found" },
        { status: 404 }
      );
    }

    await prisma.wish.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Wish has been deleted", id });
  } catch (error) {
    console.error("Error deleting wish:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
