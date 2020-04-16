import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinColumn, JoinTable} from "typeorm";
import {User} from "./User";
import {Comment} from "./Comment";
import { Tag } from "./Tag";

@Entity()
export class Notice {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    abstract: string;

    @Column()
    date: Date;

    @Column()
    text: string;

    @OneToMany(type => Comment, comment => comment.notice)
    comments: Comment[];

    @ManyToOne(type => User, user => user.notices, {
        eager: true, // carregar dados da foreign key
        onDelete: "CASCADE"
    })
    user: User;

    @ManyToMany(type => Tag, {
        eager: true
    })
    @JoinTable({
        name: 'tag_notice'
    })
    tags: Tag[]

    public isValid(): boolean {
        if (this.title && this.date && this.text && this.user && this.tags.length >= 1) {
            return true;
        } 
        return false;
    }
}
