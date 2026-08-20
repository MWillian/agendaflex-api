import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config,ConfigService) => ({
                secret: config.get<string>('JWT_SECRET', 'secret-fallback-key'),
                signOptions: {expiresIn: '7d'}
            })
        })
    ],
})
export class AuthModule{}