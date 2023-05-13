import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

 async transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(value.password, salt);
    value.password=hash
    return value;
  }
}

