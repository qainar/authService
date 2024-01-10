import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { userDto } from "./dto/user.dto";

export class UserRepository{
    constructor(@InjectModel(User) private readonly user: typeof User){}

    async getUserByEmail(user_email: string) : Promise<User | null>{
        const user = await this.user.findOne({
            where: {
                email: user_email
            }
        })

        return user
    }

    async getUserByUsername(username: string) : Promise<User | null>{
        const user = await this.user.findOne({
            where: {
                username: username
            }
        })

        return user
    }

    async getUserByPhone(phone: string) : Promise<User | null>{
        const user = await this.user.findOne({
            where: {
                phone: phone
            }
        })

        return user
    }

    async createUser(userData: userDto): Promise<User | null>{
        const user = await this.user.create(userData, {
            returning: true
        })

        return user
    }
}