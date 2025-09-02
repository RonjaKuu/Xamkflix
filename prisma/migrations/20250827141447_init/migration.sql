-- CreateTable
CREATE TABLE "public"."Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "releaseYear" INTEGER,
    "rating" DOUBLE PRECISION,
    "genre" TEXT,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
