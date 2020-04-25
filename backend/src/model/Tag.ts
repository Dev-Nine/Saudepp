import {Entity, Column, PrimaryColumn, OneToMany} from "typeorm";
import { IsString, MinLength } from 'class-validator';
import {SubTag} from "./SubTag";

@Entity()
export class Tag {

    @PrimaryColumn()
    id: string;

    @Column()
    @IsString()
    @MinLength(2)
    description: string;

    @OneToMany(type => SubTag, subTag => subTag.tag, {
        eager: true
    })
    subTags: SubTag[];

}
