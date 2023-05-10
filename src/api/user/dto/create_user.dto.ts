
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist'
import * as Joi from 'joi';

export class CreateUserDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
        default:'salam'
    })
    firstName: string;
    @ApiPropertyOptional({
        type: String,
        description: 'This is an optional property',
        default:'salam'
    })
    lastName: string;
}

export const CreateUserSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  })
  
