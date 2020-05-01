import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsDate, IsNumber, IsString } from 'class-validator';


@Entity()
export class CovidInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsDate()
    date: Date;

    @Column()
    @IsNumber()
    contagion: number;

    @Column()
    @IsNumber()
    deaths: number;

    @Column()
    @IsString()
    letality: string;

}