import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RouterModule } from '@nestjs/core'

@Module({
  imports: [
    UserModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            module: UserModule,
            path: 'user'
          }
        ]
      },
    ]),
  ],
})
export class ApiModule {
}
