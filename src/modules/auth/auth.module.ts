import { Controller, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthenticateService } from "./services/auth.services";
import { AuthenticateController } from "./controllers/auth.controller";
import { RefreshTokenControlller } from "./controllers/refresh-token.controller";
import { RefreshTokenService } from "./services/refresh-token.service";

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET', 'secret-fallback-key'),
                signOptions: {expiresIn: '7d'}
            })
        })
    ],
    providers: [AuthenticateService, RefreshTokenService],
    controllers: [AuthenticateController, RefreshTokenControlller],
    exports: [JwtModule]
})
export class AuthModule{}