import bcrypt from "bcryptjs";
import { PrismaClient } from "./generated/client/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  port: 3306,
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
    },
    create: {
      email: "admin@geecontechnology.com",
      passwordHash,
      name: "Admin",
    },
  });

  console.log("Admin created successfully:", admin.email);
}

main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });