import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const globalThisForPrisma = globalThis;
const prisma = globalThisForPrisma.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production")
  globalThisForPrisma.prismaGlobal = prisma;
