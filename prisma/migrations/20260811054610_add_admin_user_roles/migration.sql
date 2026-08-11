-- AlterTable
ALTER TABLE `admin_users` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `lastLoginAt` DATETIME(3) NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'ADMIN';

-- CreateIndex
CREATE INDEX `admin_users_role_idx` ON `admin_users`(`role`);

-- CreateIndex
CREATE INDEX `admin_users_isActive_idx` ON `admin_users`(`isActive`);
