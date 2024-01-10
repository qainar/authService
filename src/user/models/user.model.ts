import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { RefreshToken } from "./token.model";

interface UserCreationAttr {
    email: string
    username: string
    phone: string
}


@Table({tableName: 'users', timestamps: true, paranoid: true})
export class User extends Model<User, UserCreationAttr>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    username: string

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    phone: string

    @HasMany(() => RefreshToken)
    refreshToken: RefreshToken[]
}