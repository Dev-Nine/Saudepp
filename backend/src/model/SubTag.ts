import {Entity, Column, PrimaryColumn, ManyToOne} from "typeorm";
import { IsString, MinLength } from 'class-validator';
import { Tag } from "./Tag";

@Entity()
export class SubTag {

    @PrimaryColumn()
    id: string;

    @Column()
    @IsString()
    @MinLength(3)
    description: string;

    @ManyToOne(type => Tag, tag => tag.subTags)
    tag: Tag;

}
