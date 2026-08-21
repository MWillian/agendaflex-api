/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "schedules_userId_weekDay_key";

-- CreateIndex
CREATE INDEX "schedules_userId_weekDay_idx" ON "schedules"("userId", "weekDay");

-- CreateIndex
CREATE UNIQUE INDEX "users_slug_key" ON "users"("slug");
