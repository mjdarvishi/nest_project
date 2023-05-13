import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RouterModule } from '@nestjs/core'
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ProductModule,
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
          {
            module: ProductModule,
            path: 'product'
          },
        ]
      },
    ]),
  ],
})
export class ApiModule {
}
