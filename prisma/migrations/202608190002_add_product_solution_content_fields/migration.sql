ALTER TABLE `product_solutions`
    ADD COLUMN `benefitsTitle` VARCHAR(191) NULL,
    ADD COLUMN `contentSections` JSON NULL,
    ADD COLUMN `sidebarImage` VARCHAR(191) NULL;
