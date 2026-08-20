import { PipeTransform, BadRequestException } from "@nestjs/common";
import { ZodError } from "zod";
import { z } from "zod";

export interface SchemaValidator {
  parse(data: unknown): any;
}

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: SchemaValidator) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: "Validation failed",
          statusCode: 400,
          errors: z.treeifyError(error),
        });
      }
      throw new BadRequestException("Validation failed");
    }
  }
}
