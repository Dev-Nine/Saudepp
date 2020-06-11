import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { IsDate, IsNumber, IsString } from 'class-validator';


@Entity()
@Unique(["date"])
export class CovidInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsDate()
    date: Date;

    @Column({default: 0})
    @IsNumber()
    confirmed: number;

    @Column({default: 0})
    @IsNumber()
    recovered: number;

    @Column({default: 0})
    @IsNumber()
    deaths: number; 

    @Column({default: 0})
    @IsString()
    lethality: string;

}