import books from "../data.json";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const id = params.id;

  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) { //not undefined i.e. have found the book with matching id
    books.splice(index, 1);
  }
  console.log("id", id);
  return new NextResponse({ "Book deleted": id });
};
