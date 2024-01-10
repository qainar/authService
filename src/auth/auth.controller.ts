import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {userDto} from '../user/dto/user.dto'

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService){}

    @MessagePattern('register')
    async register(@Payload() userDto: userDto): Promise<any>{
        return this.authService.register(userDto);
    }

    @MessagePattern('check_code')
    async chechCode(@Payload() userDto: userDto): Promise<any>{
        return this.authService.checkCode(userDto);
    }

}
