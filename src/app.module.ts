import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ApiModule } from './api/api.module';
import { WebModule } from './web/web.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      autoLoadEntities: true,
      entities: ["dist/**/*.entity.js"],
      synchronize: true,
    }),
    WebModule,
    ApiModule,
  ],
})
export class AppModule {
}
