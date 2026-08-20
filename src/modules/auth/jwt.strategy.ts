import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload, tokenPayloadSchema } from "./dto/token-payload.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('JWT_SECRET', 'secret-fallback-key'),
            algorithms: ['HS256']
        })
    }

    validate(payload: TokenPayload) {
        return tokenPayloadSchema.parse(payload);
    }
}