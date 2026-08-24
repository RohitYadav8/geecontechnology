CREATE TABLE `case_studies` (
  `id` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `clientName` VARCHAR(191) NULL,
  `industry` VARCHAR(191) NULL,
  `shortDescription` TEXT NOT NULL,
  `description` TEXT NULL,
  `image` VARCHAR(191) NULL,
  `challenge` TEXT NULL,
  `solution` TEXT NULL,
  `results` TEXT NULL,
  `technologies` JSON NULL,
  `projectUrl` VARCHAR(191) NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT true,
  `order` INTEGER NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,

  UNIQUE INDEX `case_studies_slug_key`(`slug`),
  INDEX `case_studies_slug_idx`(`slug`),
  INDEX `case_studies_isActive_idx`(`isActive`),
  INDEX `case_studies_order_idx`(`order`),

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;