import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/models/user.model';
import { RefreshToken } from './user/models/token.model';
import { AuthCode } from './user/models/code.model';

@Module({
  imports: [
    AuthModule, 
    UserModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, RefreshToken, AuthCode],
      autoLoadModels: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
