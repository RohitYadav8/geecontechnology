CREATE TABLE `product_solutions` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `projectTag` VARCHAR(191) NULL,
    `cardBackTitle` VARCHAR(191) NULL,
    `excerpt` TEXT NULL,
    `content` LONGTEXT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `logoImage` VARCHAR(191) NULL,
    `bannerImage` VARCHAR(191) NULL,
    `metaTitle` VARCHAR(191) NULL,
    `metaDescription` TEXT NULL,
    `keywords` VARCHAR(191) NULL,
    `canonicalUrl` VARCHAR(191) NULL,
    `openGraphImage` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `product_solutions_slug_key`(`slug`),
    INDEX `product_solutions_slug_idx`(`slug`),
    INDEX `product_solutions_isActive_idx`(`isActive`),
    INDEX `product_solutions_order_idx`(`order`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;