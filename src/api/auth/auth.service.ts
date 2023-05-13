import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) { }


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