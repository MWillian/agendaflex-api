import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client/extension";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit{
    constructor(){
        const dbUrl = process.env.DATABASE_URL || "file:./dev.db"
        const adapter = new PrismaBetterSqlite3({url: dbUrl})

        super({adapter})
    }
    async onModuleInit() {
        await this.$connect()
    }
    async onModuleDestroy() {
        await this.$disconnect()
    }
}
