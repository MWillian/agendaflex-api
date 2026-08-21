import { Body, Controller, HttpCode, Post, UseGuards, UsePipes } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { ZodValidationPipe } from "../../../pipes/zod-validation-pipe";
import { setScheduleBodySchema } from "../dto/set-schedules.dto";
import type { SetScheduleBodySchema } from "../dto/set-schedules.dto";

import { CurrentUser } from "../../auth/current-user.decorator";
import type { TokenPayload } from "../../auth/dto/token-payload.dto";
import { SetSchedulesService } from "../services/set-schedules.services";

@Controller('/schedules')
@UseGuards(JwtAuthGuard)
export class SetSchedulesController {
    constructor(private setSchedulesService: SetSchedulesService) { }

    @Post()
    @HttpCode(204)
    @UsePipes(new ZodValidationPipe(setScheduleBodySchema))
    async handle(
        @CurrentUser() user: TokenPayload,
        @Body() body: SetScheduleBodySchema
    ){
        await this.setSchedulesService.execute({
            userId: user.sub,
            schedules: body.schedules
        })
    }
}