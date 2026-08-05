-- CreateTable
CREATE TABLE `admin_users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `candidate_submissions` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `dob` VARCHAR(191) NULL,
    `qualification` VARCHAR(191) NULL,
    `qualificationYear` VARCHAR(191) NULL,
    `pursuingDegree` VARCHAR(191) NULL,
    `position` VARCHAR(191) NULL,
    `totalExperience` VARCHAR(191) NULL,
    `relevantExperience` VARCHAR(191) NULL,
    `currentLocation` VARCHAR(191) NULL,
    `relocate` VARCHAR(191) NULL,
    `travelAbroad` VARCHAR(191) NULL,
    `passport` VARCHAR(191) NULL,
    `visa` VARCHAR(191) NULL,
    `currentlyWorking` VARCHAR(191) NULL,
    `reasonForChange` TEXT NULL,
    `currentCtc` VARCHAR(191) NULL,
    `inHandSalary` VARCHAR(191) NULL,
    `expectedCtc` VARCHAR(191) NULL,
    `expectedInHand` VARCHAR(191) NULL,
    `noticePeriod` VARCHAR(191) NULL,
    `earliestJoinDate` VARCHAR(191) NULL,
    `dependents` VARCHAR(191) NULL,
    `readyOnCurrentCtc` VARCHAR(191) NULL,
    `resumeUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
