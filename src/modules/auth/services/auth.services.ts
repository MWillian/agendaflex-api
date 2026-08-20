import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { AuthenticateBodySchema } from "../dto/authenticate.dto";
import { compare } from "bcryptjs";

@Injectable()
export class AuthenticateService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async execute({ email, password }: AuthenticateBodySchema) {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            throw new UnauthorizedException('Invalid credentials.')
        }

        const isPasswordValid = await compare(password, user.password)

        if (isPasswordValid === false) {
            throw new UnauthorizedException('Invalid credentials.')
        }

        const accessToken = this.jwtService.sign(
            { sub: user.id, slug: user.slug },
            { expiresIn: '15m' }
        )

        const refreshToken = this.jwtService.sign(
            { sub: user.id, slug: user.slug },
            { expiresIn: '7d' }
        )

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }
}