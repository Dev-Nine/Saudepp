import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, BeforeInsert} from "typeorm";
import { IsDate, IsString, MinLength, IsNumber } from 'class-validator';
import {User} from "./User";
import {Comment} from "./Comment";
import { Tag } from "./Tag";

@Entity()
export class Notice {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 70 })
    @IsString()
    title: string;

    @Column({ length: 120 })
    @IsString()
    abstract: string;

    @Column()
    @IsDate({ always: false })
    date: Date;

    @Column({ type: "text", select: false })
    @IsString()
    text: string;

    @Column({ length: 8 })
    @IsString()
    imageId: string;

    @Column({ length: 5 })
    @IsString()
    imageType: string;

    @Column({ length: 16 })
    @IsString()
    deleteHash: string;

    @Column({ default: 0 })
    @IsNumber()
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
