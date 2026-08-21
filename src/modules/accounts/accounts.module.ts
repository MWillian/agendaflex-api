import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller";
import { CreateAccountService } from "./services/create-account.service";
import { UsersRepository } from "./repositories/user.repository";
import { PrismaUsersRepository } from "./repositories/prisma/prisma-users.repository";

@Module({
  controllers: [CreateAccountController],
  providers: [
    CreateAccountService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository
    }
  ],
  exports: [UsersRepository]
})
export class AccountsModule { }
