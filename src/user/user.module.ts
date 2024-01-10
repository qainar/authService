import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { RefreshToken } from './models/token.model';
import { UserRepository } from './user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { AuthCode } from './models/code.model';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [
    SequelizeModule.forFeature([User, RefreshToken, AuthCode]),
    forwardRef(() => AuthModule),
  ],
  exports: [
    UserService
  ]
})
export class UserModule {}
