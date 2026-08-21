import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenBodySchema } from "../dto/refresh-token.dto";
import { UsersRepository } from "../../accounts/repositories/user.repository";

interface JwtPayload {
    sub: string,
    slug: string
}

@Injectable()
export class RefreshTokenService {
    constructor(private usersRepository: UsersRepository, private jwtservice: JwtService) { }

    async execute({ refresh_token }: RefreshTokenBodySchema) {
        let payload: JwtPayload
        try {
            payload = this.jwtservice.verify<JwtPayload>(refresh_token)
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired refresh token')
        }

        const user = await this.usersRepository.findById(payload.sub)

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