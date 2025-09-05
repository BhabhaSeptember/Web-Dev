/*
  Warnings:

  - You are about to drop the `GroceryItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GroceryItem";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Wish" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "img" TEXT NOT NULL
);
