import { NextResponse } from "next/server";
import { prisma } from "../../../db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  const filteredWishes = await prisma.wish.findMany({
    where: {
      title: {
        contains: query,
      },
    },
  });

  console.log(searchParams);
  return NextResponse.json(filteredWishes);
}
