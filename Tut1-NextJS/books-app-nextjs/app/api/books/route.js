// import books from "./data.json";
import { NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";
import { prisma } from "../../db";
import fs from "fs/promises";
import path from "path";

export async function GET(req) {
  //dummy books data

  //   await prisma.book.create({
  //     data: {
  //       title: "Prisma Book",
  //       link: "https://www.amazon.com/dp/B0BXMRB5VF/",
  //       img: "https://via.placeholder.com/600/92c952",
  //     },
  //   });

  const books = await prisma.book.findMany();
  console.log("GET books called");

  return NextResponse.json(books);
}

export const POST = async (request) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const link = formData.get("link");
  const file = formData.get("img");

  if (!title || !link || !file) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  // Save image to local folder (or upload to a storage service)
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadDir = path.join(process.cwd(), "public/uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, file.name);
  await fs.writeFile(filePath, buffer);

  const imageUrl = `/uploads/${file.name}`; // URL for the stored image

  // Save book to database
  const newBook = await prisma.book.create({
    data: { title, link, img: imageUrl },
  });

  return NextResponse.json(newBook, { status: 201 });
};

// export async function POST(req) {
//   const { title, link, img } = await req.json(); //retrieve body data
//   //   const newBook = {
//   //     id: uuidv4(),
//   //     title,
//   //     link,
//   //     img,
//   //   };
//   //   books.push(newBook);

//   await prisma.book.create({
//     data: {
//       title: title,
//       link: link,
//       img: img,
//     },
//   });

//   return NextResponse.json("Book added successfully");
// }
