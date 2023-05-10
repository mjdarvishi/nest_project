import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Res, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger/index'
import { CreateUserDecorator } from './decorator/create_user.decorator';
import { ResponseApi, ResponseInterface } from '../tools/interfaces/response.interface';
import { UserEntity } from './user.entity';
import { Response } from 'express';

@ApiTags('User')
@Controller()
export class UserController {
    constructor(private readonly usersService: UserService) { }

    @Post()
    @HttpCode(201)
    @CreateUserDecorator()
    async store(@Body() userInfo: CreateUserDto): Promise<ResponseInterface<null>> {
        await this.usersService.store(userInfo);
        return ResponseApi.successResponse('item has been added', 201);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<void> {
        const user = await this.usersService.findOne(id);
        if (!user) {
            ResponseApi.faildResponseWithCode(res, 'item not found', 404);
        }
        ResponseApi.successResponseWithCode<UserEntity>(res, 'item retrived successfuly', 200, user)
    }
}
