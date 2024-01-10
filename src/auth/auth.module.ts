import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository'
import { UserService } from 'src/user/user.service';
import { TokenService } from './token.service';
import { UserRepository } from 'src/user/user.repository';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/models/user.model';
import { RefreshToken } from 'src/user/models/token.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailService } from './mail.service';
import { AuthCode } from 'src/user/models/code.model';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, TokenService, JwtService, MailService],
  imports: [
    forwardRef(() => UserModule),
    SequelizeModule.forFeature([User, RefreshToken, AuthCode]),
  ],
  exports: [AuthService, TokenService]
})
export class AuthModule {}
