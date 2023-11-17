/*
  Warnings:

  - The primary key for the `tbLogin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tbLogin` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "tbLogin_userId_key";

-- AlterTable
CREATE SEQUENCE tblogin_userid_seq;
ALTER TABLE "tbLogin" DROP CONSTRAINT "tbLogin_pkey",
DROP COLUMN "id",
ALTER COLUMN "userId" SET DEFAULT nextval('tblogin_userid_seq'),
ADD CONSTRAINT "tbLogin_pkey" PRIMARY KEY ("userId");
ALTER SEQUENCE tblogin_userid_seq OWNED BY "tbLogin"."userId";
