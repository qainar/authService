import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { userDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { constants } from 'src/utlis/errors';
import { TokenService } from './token.service';
import { MailService } from './mail.service';

@Injectable()
export class AuthService {
    constructor (
        private readonly authRepository: AuthRepository,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly mailService: MailService
        ) {}

    public async register(userData: userDto){
        const existsEmail = await this.userService.getUserByEmail(userData.email);

        if(existsEmail){
            throw new HttpException(
                constants.email_exists_error,
                HttpStatus.BAD_REQUEST
            )
        }

        const existsUsername = await this.userService.getUserByUsername(userData.username)

        if(existsUsername){
            throw new HttpException(
                constants.username_exists_error,
                HttpStatus.BAD_REQUEST
            )
        }

        const existsPhone = await this.userService.getUserByPhone(userData.phone)

        if(existsPhone){
            throw new HttpException(
                constants.phone_exists_error,
                HttpStatus.BAD_REQUEST
            )
        }
    
        await this.userService.createUser(userData)
        await this.sendCode(userData.email)

        return {
            status: HttpStatus.ACCEPTED,
            message: 'The code has been sent'
        }
    }

    private async sendCode(email: string){
        const generated_code = await this.generateCode(email)
        await this.mailService.sendCodeToMail(email, generated_code)

        return {
            status: 'ok',
            message: 'The code has been sent'
        }
    }


    private async generateCode(email: string){
        let code = '';
        for (let i = 0; i < 4; i++) {
          const randomDigit = Math.floor(Math.random() * 10);
          code += randomDigit.toString();
        }

        await this.authRepository.saveCode(email, code)

        return code; 
    }

    public async checkCode(userData: userDto){
        const savedCode = await this.authRepository.getCode(userData.email)

        if (userData.code !== savedCode.code){
            throw new HttpException(
                constants.invalid_code,
                HttpStatus.BAD_REQUEST
            )
        }

        const user = await this.userService.getUserByEmail(userData.email)
        const tokens = await this.tokenService.generateToken(user)
        await this.authRepository.saveToken(user.id, tokens.refreshToken)

        return {
            accessToken: tokens.accessToken,
            user: user
        }
    }

}
