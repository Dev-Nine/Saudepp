import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Notice} from "./Notice";
import {User} from "./User";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
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

    public isValid(): boolean {
        if (this.content && this.date && this.notice && this.author) {
            return true;
        } 
        return false;
    }
}
