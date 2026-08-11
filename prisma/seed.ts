import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  port: Number(process.env.DATABASE_PORT || 3306),
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const passwordHash = await bcrypt.hash("Admin@123", 10);

  const admin = await prisma.adminUser.upsert({
    where: {
      email: "admin@geecontechnology.com",
    },

    update: {
      passwordHash,
      name: "Admin",
      role: "SUPER_ADMIN",
      isActive: true,
    },

    create: {
      email: "admin@geecontechnology.com",
      passwordHash,
      name: "Admin",
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  console.log("Admin created successfully:", admin.email);
  console.log("Role:", admin.role);
  console.log("Status:", admin.isActive ? "Active" : "Inactive");
}

main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });