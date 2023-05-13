import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags } from '@nestjs/swagger/index'
import { LoginDto } from "./dto/login.dto";


@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() loginDto: LoginDto) {
      return this.authService.signIn(loginDto.email, loginDto.password);
    }
}