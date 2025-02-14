import { PrismaClient } from '@prisma/client'



//Add our PrismaClient to the global object

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

//create a prisma variable where we set it to either the global variable
//we've just created or create a brand new PrismaClient

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ['query'],
    })



//If we are not in production, we get Prisma from the global variable

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma