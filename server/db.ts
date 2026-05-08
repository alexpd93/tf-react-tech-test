import { PrismaClient } from "./generated/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import 'dotenv/config';

const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({
    adapter
});

export default prisma;