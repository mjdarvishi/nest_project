import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create_user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService, @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,) { }

    public async store(user: CreateUserDto) {
        var result = await this.usersRepository.save(user)
        const payload = { username: result.email, userId: result.id };

        return  {
            access_token: await this.jwtService.signAsync(payload),
        };
      }
    

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if(user?.password==null){
            throw new NotFoundException('user not found')
        }
        const match=await bcrypt.compare(pass,user.password);
        if ( !match) {
            throw new UnauthorizedException();
        }
        const payload = { username: user.email, userId: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}