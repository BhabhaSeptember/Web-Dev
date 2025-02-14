import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const DELETE = async (request, { params }) => {
  const id = params.id;

  try {
    // Check if the book exists
    const existingBook = await prisma.book.findUnique({
      where: { id },
    });

    if (!existingBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // Delete the book
    await prisma.book.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Book deleted", id });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// import books from "../data.json";

// import { NextResponse } from "next/server";

// export const DELETE = async (request, { params }) => {
//   const id = params.id;

//   //   const index = books.findIndex((book) => book.id === id);
//   //   if (index !== -1) { //if not undefined i.e. have found the book with matching id
//   //     books.splice(index, 1);
//   //   }

//   await prisma.book.delete({ where: { id: id } });

//   console.log("id", id);
//   return new NextResponse({ "Book deleted": id });
// };
