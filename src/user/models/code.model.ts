import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'auth_code'})
export class AuthCode extends Model<AuthCode>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    email: string

    @Column({type: DataType.STRING, allowNull: false})
    code: string
}