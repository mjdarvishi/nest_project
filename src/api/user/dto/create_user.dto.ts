
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist'
import * as Joi from 'joi';

export class CreateUserDto {
    
    @ApiProperty({
        type: String,
        description: 'This is a required property',
        default:'javad'
    })
    firstName: string;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
        default:'user@gmail.com'
    })
    email: string;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
        default:'102030'
    })
    password: string;
    @ApiPropertyOptional({
        type: String,
        description: 'This is an optional property',
        default:'darvishi'
    })
    lastName: string;
}

export const CreateUserSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
  
