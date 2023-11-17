-- CreateTable
CREATE TABLE "tbLogin" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "nameUser" TEXT NOT NULL,

    CONSTRAINT "tbLogin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "tbUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbLogin_userId_key" ON "tbLogin"("userId");

-- AddForeignKey
ALTER TABLE "tbLogin" ADD CONSTRAINT "tbLogin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
