-- AlterTable
ALTER TABLE `products` ADD COLUMN `brochureGradientFrom` VARCHAR(191) NULL,
    ADD COLUMN `brochureGradientTo` VARCHAR(191) NULL,
    ADD COLUMN `brochureGradientVia` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `services` ADD COLUMN `brochureGradientFrom` VARCHAR(191) NULL,
    ADD COLUMN `brochureGradientTo` VARCHAR(191) NULL,
    ADD COLUMN `brochureGradientVia` VARCHAR(191) NULL;
