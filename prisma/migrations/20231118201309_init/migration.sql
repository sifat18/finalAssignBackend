-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('super_admin', 'admin', 'client');

-- CreateEnum
CREATE TYPE "User_Service" AS ENUM ('user_management', 'super_management', 'content_management', 'normal_user');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "Roles" DEFAULT 'client',
    "address" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "service" "User_Service" DEFAULT 'normal_user',
    "phoneNumber" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");
