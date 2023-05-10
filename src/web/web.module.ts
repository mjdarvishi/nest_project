import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core'
import { IndexModule } from './index/index.module';

@Module({
  imports: [
    IndexModule,
    RouterModule.register([
      {
        path: 'web',
        children: [
          {
            module: IndexModule,
            path: 'index'
          }
        ]
      },
    ]),
  ],
})
export class WebModule {
}
