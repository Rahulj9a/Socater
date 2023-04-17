import { PrismaClient } from "@prisma/client";

declare global {
     var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV != "production") globalThis.prisma = client;

export default client;
/* this code provides a simple and efficient way to create and use a PrismaClient instance throughout an application, while also ensuring that only one instance is created and used. */
