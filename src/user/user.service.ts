import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { userDto } from './dto/user.dto';
import { constants } from 'src/utlis/errors';

@Injectable()
export class UserService {
    constructor (private readonly userRepository: UserRepository){}

    async getUserByEmail(user_email: string){
        const user = await this.userRepository.getUserByEmail(user_email)

        return user
    };

    async getUserByUsername(username: string){
        const user = await this.userRepository.getUserByUsername(username)

        return user
    }

    async getUserByPhone(phone: string){
        const user = await this.userRepository.getUserByPhone(phone)

        return user
    }

    async createUser(userData: userDto){
        const user = await this.userRepository.createUser(userData)

        if(!user){
            throw new HttpException(
                constants.user_create_error,
                HttpStatus.BAD_REQUEST
            )
        }

        return user
    }
}
