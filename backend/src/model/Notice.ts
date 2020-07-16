import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, BeforeInsert} from "typeorm";
import {User} from "./User";
import {Comment} from "./Comment";
import { Tag } from "./Tag";

@Entity()
export class Notice {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    title: string;

    @Column({ length: 150 })
    abstract: string;

    @Column()
    date: Date;

    @Column({ type: "text", select: false })
    text: string;

    @Column({ length: 8, nullable: true })
    imageId: string;

    @Column({ length: 5, nullable: true })
    imageType: string;

    @Column({ length: 16, nullable: true, select: false })
    deleteHash: string;

    @Column({ default: 0 })
    views: number;

    @OneToMany(type => Comment, comment => comment.notice)
    comments: Comment[];

    @ManyToOne(type => User, user => user.notices, {
        eager: true, // carregar dados da foreign key
        onDelete: "CASCADE"
    })
    user: User;

    @ManyToMany(type => Tag, {
        eager: true,
        cascade: true
    })
    @JoinTable({
        name: 'tag_notice',
    })
    tags: Tag[]
}
