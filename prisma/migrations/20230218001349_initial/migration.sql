-- CreateTable
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL,
    "candidate_name" TEXT NOT NULL,
    "ra" DOUBLE PRECISION NOT NULL,
    "dec" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photometry" (
    "id" TEXT NOT NULL,
    "candidate_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "error" DOUBLE PRECISION NOT NULL,
    "obs_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Photometry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "unit_name" TEXT NOT NULL,
    "unit_description" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_candidate_name_key" ON "Candidate"("candidate_name");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_unit_name_key" ON "Unit"("unit_name");

-- AddForeignKey
ALTER TABLE "Photometry" ADD CONSTRAINT "Photometry_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
