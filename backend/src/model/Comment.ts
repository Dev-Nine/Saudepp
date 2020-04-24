import { IsString, IsDate, MinLength } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from "typeorm";
import { Notice } from "./Notice";
import { User } from "./User";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @MinLength(1)
    content: string;

    @Column()
    @IsDate()
    date: Date;

    @ManyToOne(type => Notice, notice => notice.comments, {
        eager: true, // carregar dados da foreign key
        onDelete: "CASCADE"
    })
    notice: Notice;

    @ManyToOne(type => User, user => user.comments, {
        eager: true, // carregar dados da foreign key
        onDelete: "CASCADE"
    })
    author: User;

    @BeforeInsert()
    updateDates() {
      this.date = new Date;
    }

    public isValid(): boolean {
        if (this.content && this.notice && this.author) {
            return true;
        }
        return false;
    }
}
