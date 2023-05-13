import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags } from '@nestjs/swagger/index'
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "./dto/create_user.dto";
import { ResponseApi, ResponseInterface } from "../utils/response.utils";
import { CreateUserDecorator } from "./decoratore/create_user.decorator";


@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('singIn')
    signIn(@Body() loginDto: LoginDto) {
      return this.authService.signIn(loginDto.email, loginDto.password);
    }


    @Post('singUp')
    @HttpCode(201)
    @CreateUserDecorator()
    async store(@Body() userInfo: CreateUserDto): Promise<ResponseInterface<Object>> {
        const result=await this.authService.store(userInfo);
        return ResponseApi.successResponse('item has been added', 201,result);
    }
}