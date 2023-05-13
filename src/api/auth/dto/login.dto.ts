
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist'
import * as Joi from 'joi';

export class LoginDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
        default:'user@gmail.com'
    })
    email: string;
    @ApiPropertyOptional({
        type: String,
        description: 'This is an optional property',
        default:'102030'
    })
    password: string;
    
}

export const LoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
  
