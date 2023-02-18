/*
  Warnings:

  - You are about to drop the column `candidate_name` on the `Candidate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Candidate_candidate_name_key";

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "candidate_name",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_name_key" ON "Candidate"("name");
