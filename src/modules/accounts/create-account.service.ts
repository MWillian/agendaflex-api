import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateAccountBodySchema } from "./dto/create-account.dto";
import { hash } from "bcryptjs";

@Injectable()
export class CreateAccountService {
  constructor(private prisma: PrismaService) {}

  async execute(data: CreateAccountBodySchema) {
    const { name, slug, email, password } = data;

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException(
        "User with same e-mail address already exists."
      );
    }

    const userWithSameSlug = await this.prisma.user.findUnique({
      where: { slug },
    });

    if (userWithSameSlug) {
      throw new ConflictException("Company with same slug already exists.");
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.prisma.user.create({
      data: {
        name,
        slug,
        email,
        password: hashedPassword,
      },
    });

    return {
      userId: user.id,
    };
  }
}
