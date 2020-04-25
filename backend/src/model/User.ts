import { MinLength, MaxLength, IsInt, IsEmail, IsString, Min, Max } from 'class-validator';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Notice } from './Notice';
import { Comment } from './Comment';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    @IsString()
    @MinLength(5, {
      message: 'O Nome precisa ter no minimo 5 caracteres!'
    })
    @MaxLength(50, {
      message: 'O nome ultrapassa o tamanho limite!'
    })
    name: string;

    @Column({ length: 8000, select: false })
    @IsString()
    @MaxLength(8000)
    password: string;

    @Column({ unique: true, length: 50 })
    @IsString()
    @IsEmail()
    @MinLength(5) // so pra ter certeza kk
    @MaxLength(50)
    email: string;

    @Column()
    @IsInt()
    @Min(0)
    @Max(3)
    type: number;
    // 0 -> admin
    // 1 -> moderador
    // 2 -> profissional
    // 3 -> comum

    @OneToMany(type => Notice, notice => notice.user)
    notices: Notice[];

    @OneToMany(type => Comment, comment => comment.author)
    comments: Comment[];

    public isValid(): boolean {
        if (this.name && this.password && this.email
            && !isNaN(this.type) && this.type >= 0 && this.type <= 3)
        {
            return true;
        }
        return false;
    }
}
