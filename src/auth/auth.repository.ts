import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AuthCode } from "src/user/models/code.model";
import { RefreshToken } from "src/user/models/token.model";
import { User } from "src/user/models/user.model";

@Injectable()
export class AuthRepository{
    constructor(
        @InjectModel(User) private readonly user: typeof User,
        @InjectModel(RefreshToken) private readonly refreshToken: typeof RefreshToken,
        @InjectModel(AuthCode) private readonly authCode: typeof AuthCode
        ){}

    async saveToken(user_id: number, token: string){
        await this.refreshToken.create({
            user_id: user_id,
            refresh_token: token
        })
    }

    async saveCode(email: string, code: string){
        await this.authCode.create({
            email: email,
            code: code
        })
    }

    async getCode(email: string){
        const code = await this.authCode.findOne({
            where: {
                email: email
            }
        })

        return code
    }
}