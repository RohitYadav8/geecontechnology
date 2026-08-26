-- AlterTable
ALTER TABLE `services` ADD COLUMN `bannerImage` VARCHAR(191) NULL,
    ADD COLUMN `benefits` JSON NULL,
    ADD COLUMN `challenges` JSON NULL,
    ADD COLUMN `closing` TEXT NULL,
    ADD COLUMN `coverage` JSON NULL,
    ADD COLUMN `gradient` VARCHAR(191) NULL,
    ADD COLUMN `intro` JSON NULL,
    ADD COLUMN `middle` JSON NULL,
    ADD COLUMN `qa` JSON NULL,
    ADD COLUMN `sections` JSON NULL;
