import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

@Table({tableName: 'refresh_tokens'})
export class RefreshToken extends Model<RefreshToken>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, unique: true, allowNull: false})
    user_id: number

    @Column({type: DataType.TEXT, unique: true, allowNull: false})
    refresh_token: string

    @BelongsTo(() => User)
    user: User
}