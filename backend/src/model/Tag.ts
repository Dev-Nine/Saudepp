import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { IsString, MinLength } from 'class-validator';

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsString()
    @MinLength(2)
    description: string;
}
