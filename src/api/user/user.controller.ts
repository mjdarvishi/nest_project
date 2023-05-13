import { BadRequestException, Body, Controller, Get,ParseIntPipe, Query, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create_user.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger/index'
import { PaginationResponseInterface, ResponseApi, ResponseInterface } from '../utils/response.utils';
import { UserEntity } from './user.entity';
import { ApiResponse, getSchemaPath ,ApiBearerAuth} from '@nestjs/swagger'
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

@ApiTags('User')
@Controller()
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Get('/getOne')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT')
    async findOne(@Req() request:Request): Promise<ResponseInterface<UserEntity>> {
        const user = await this.usersService.findOne(request['user']['userId']);
        if (!user) {
            throw new BadRequestException('Invalid user');
        }
       return ResponseApi.successResponse<UserEntity>('item retrived successfuly', 200, user)
    }
    //pagination
    @ApiResponse({
    status: 200,
    type: CreateUserDto,
    schema: {
      $ref: getSchemaPath(CreateUserDto),
    },
  })
    @Get('')
    async findAll(@Query('page', ParseIntPipe) page: number,@Query('limit', ParseIntPipe) limit: number): Promise<PaginationResponseInterface<UserEntity[]>> {
        const users = await this.usersService.findAll(page,limit);
        return ResponseApi.paginateResponse<UserEntity[]>('item retrived successfuly', 200,users,page,limit)
    }
}
