import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RouterModule } from '@nestjs/core'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            module: UserModule,
            path: 'user'
          },
          {
            module: AuthModule,
            path: 'auth'
          },
        ]
      },
    ]),
  ],
})
export class ApiModule {
}
