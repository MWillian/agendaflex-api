import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenBodySchema } from "../dto/refresh-token.dto";

interface JwtPayload {
    sub: string,
    slug: string
}

@Injectable()
export class RefreshTokenService {
    constructor(private prisma: PrismaService, private jwtservice: JwtService) { }

    async execute({ refresh_token }: RefreshTokenBodySchema) {
        let payload: JwtPayload
        try {
            payload = this.jwtservice.verify<JwtPayload>(refresh_token)
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired refresh token')
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        })

        if (!user) {
            throw new UnauthorizedException('User not found')
        }

        const newAccessToken = this.jwtservice.sign(
            { sub: user.id, slug: user.slug },
            { expiresIn: '15m' }
        )

        const newRefreshToken = this.jwtservice.sign(
            { sub: user.id, slug: user.slug },
            { expiresIn: '7d' }
        )

        return {
            access_token: newAccessToken,
            refresh_token: newRefreshToken
        }
    }
}