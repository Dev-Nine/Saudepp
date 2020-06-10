import {Entity, Column, PrimaryColumn} from "typeorm";
import { IsString, MinLength } from 'class-validator';

@Entity()
export class Tag {

    @PrimaryColumn()
    id: string;

    @Column()
    @IsString()
    @MinLength(2)
    description: string;
}
