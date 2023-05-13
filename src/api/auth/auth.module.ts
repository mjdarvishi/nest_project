import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [JwtModule.register({
    global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
  }),TypeOrmModule.forFeature([UserEntity]),forwardRef(() => UserModule)],
  providers: [AuthService,AuthGuard],
  controllers: [AuthController],
  exports: [AuthService,AuthGuard],
})
export class AuthModule {}