import { UsePipes, applyDecorators } from "@nestjs/common";
import { CreateUserValidationPipe } from "../pip/create_user.pip";
import { CreateUserSchema } from "../dto/create_user.dto";
import { ApiCreatedResponse, ApiUnprocessableEntityResponse, ApiForbiddenResponse, ApiConsumes } from '@nestjs/swagger/dist/decorators'

export function CreateUserDecorator() {
    return applyDecorators(
        UsePipes(new CreateUserValidationPipe(CreateUserSchema)),
        ApiCreatedResponse({ description: 'Created Succesfully' }),
        ApiUnprocessableEntityResponse({ description: 'Bad Request' }),
        ApiForbiddenResponse({ description: 'Unauthorized Request' }),
    );
  }