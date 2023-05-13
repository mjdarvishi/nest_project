import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from 'src/api/api.module';
import { DataSource } from 'typeorm';

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
      synchronize: false,
    }),
    ApiModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
