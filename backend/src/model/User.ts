import { MinLength, MaxLength, IsInt, IsEmail, IsString, Min, Max } from 'class-validator';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Notice } from './Notice';
import { Comment } from './Comment';

export enum UserRole {
    ADMIN = 0,
    //MODERADOR = 1,
    PROFISSIONAL = 2,
    //COMUM = 3,
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    name: string;

    @Column({ length: 8000, select: false })
    @IsString()
    @MaxLength(8000)
    password: string;

    @Column({ unique: true, length: 50, select: false })
    @IsString()
    @IsEmail()
    @MinLength(5) // so pra ter certeza kk
    @MaxLength(50)
    email: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.PROFISSIONAL
    })
    @IsInt()
    @Min(0)
    @Max(3)
    type: UserRole;
    

    @OneToMany(type => Notice, notice => notice.user)
    notices: Notice[];

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];

}
