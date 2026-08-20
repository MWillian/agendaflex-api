import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "../../../pipes/zod-validation-pipe";
import { authenticateBodySchema } from "../dto/authenticate.dto";
import type {AuthenticateBodySchema} from "../dto/authenticate.dto"
import { AuthenticateService } from "../services/auth.services";

@Controller('/sessions')
export class AuthenticateController {
    constructor(private authenticateService: AuthenticateService){}

    @Post()
    @HttpCode(200)
    @UsePipes(new ZodValidationPipe(authenticateBodySchema))
    async handle(@Body() body: AuthenticateBodySchema){
        return this.authenticateService.execute(body)
    }
}