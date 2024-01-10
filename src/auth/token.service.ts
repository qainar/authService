import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/models/user.model";

@Injectable()
export class TokenService {
    constructor (private readonly jwtService: JwtService){}

    async generateToken(user: User){
        const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
            phone: user.phone,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
        
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '15d'
        })
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '90d',
        })

        return{
            accessToken,
            refreshToken
        }
    }
}