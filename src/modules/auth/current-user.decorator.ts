import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { TokenPayload } from "./dto/token-payload.dto";

export const CurrentUser = createParamDecorator(
    (_: never, context: ExecutionContext): TokenPayload => {
        const request = context.switchToHttp().getRequest();
        return request.user;
    }
)