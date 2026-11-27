const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const connectPrisma = async () => {
  try {
    await prisma.$connect();
    console.log("Prisma connected to PostgreSQL");
  } catch (error) {
    console.error("❌ PostgreSQL connection error:", error);
  }
};

module.exports = connectPrisma;
