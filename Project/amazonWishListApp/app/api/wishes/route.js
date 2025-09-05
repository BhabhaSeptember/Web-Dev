import { NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";
import { prisma } from "../../db";
import fs from "fs/promises";
import path from "path";

export async function GET(req) {

  const wishes = await prisma.wish.findMany();
  console.log("GET wishes called");

  return NextResponse.json(wishes);
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


  const newWish = await prisma.wish.create({
    data: { title, link, img: imageUrl },
  });

  return NextResponse.json(newWish, { status: 201 });
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
