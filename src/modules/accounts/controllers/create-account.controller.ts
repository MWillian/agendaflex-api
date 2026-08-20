import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "../../../pipes/zod-validation-pipe";
import type { CreateAccountBodySchema } from "../dto/create-account.dto";
import { createAccountBodySchema } from "../dto/create-account.dto";
import { CreateAccountService } from "../services/create-account.service";

@Controller("/accounts")
export class CreateAccountController {
  constructor(private createAccountService: CreateAccountService){}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    await this.createAccountService.execute(body)
  }
}
