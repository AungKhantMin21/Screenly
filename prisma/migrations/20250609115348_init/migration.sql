-- CreateTable
CREATE TABLE "ResumeResult" (
    "id" SERIAL NOT NULL,
    "resumeText" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "matchScore" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "strengths" TEXT[],
    "weaknesses" TEXT[],
    "suggestions" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResumeResult_pkey" PRIMARY KEY ("id")
);
