import { Body, Controller, HttpCode, Patch, UsePipes } from "@nestjs/common";
import { RefreshTokenService } from "../services/refresh-token.service";
import { ZodValidationPipe } from "../../../pipes/zod-validation-pipe";
import { refreshTokenBodySchema } from "../dto/refresh-token.dto";
import type { RefreshTokenBodySchema } from "../dto/refresh-token.dto"

@Controller('/sessions')
export class RefreshTokenControlller {
    constructor(private refreshTokenService: RefreshTokenService) { }

    @Patch('/refresh')
    @HttpCode(200)
    @UsePipes(new ZodValidationPipe(refreshTokenBodySchema))
    async handle(@Body() body: RefreshTokenBodySchema) {
        return this.refreshTokenService.execute(body)
    }
} 