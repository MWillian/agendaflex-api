import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller";
import { CreateAccountService } from "./create-account.service";

@Module({
  controllers: [CreateAccountController],
  providers: [CreateAccountService],
})
export class AccountsModule {}
