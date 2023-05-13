import { BadRequestException, Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Query, Res, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger/index'
import { CreateUserDecorator } from './decorator/create_user.decorator';
import { PaginationResponseInterface, ResponseApi, ResponseInterface } from '../utils/response.utils';
import { UserEntity } from './user.entity';
import { Response } from 'express';
import { take } from 'rxjs';

@ApiTags('User')
@Controller()
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post()
    @HttpCode(201)
    @CreateUserDecorator()
    async store(@Body() userInfo: CreateUserDto): Promise<ResponseInterface<null>> {
        await this.usersService.store(userInfo);
        return ResponseApi.successResponse('item has been added', 201);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new BadRequestException('Invalid user');
        }
        ResponseApi.successResponse<UserEntity>('item retrived successfuly', 200, user)
    }
    //pagination
    @Get('')
    async findAll(@Query('page', ParseIntPipe) page: number,@Query('limit', ParseIntPipe) limit: number): Promise<PaginationResponseInterface<UserEntity[]>> {
        const users = await this.usersService.findAll(page,limit);
        return ResponseApi.paginateResponse<UserEntity[]>('item retrived successfuly', 200,users,page,limit)
    }
}
