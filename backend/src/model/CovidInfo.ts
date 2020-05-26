import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsDate, IsNumber, IsString } from 'class-validator';


@Entity()
export class CovidInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsDate()
    date: Date;

    @Column({default: 0})
    @IsNumber()
    contagion: number;

    @Column({default: 0})
    @IsNumber()
    contagion_news: number;

    @Column({default: 0})
    @IsNumber()
    recupered: number;

    @Column({default: 0})
    @IsNumber()
    deaths: number;

    @Column({default: 0})
    @IsNumber()
    deaths_news: number;    

    @Column({default: 0})
    @IsString()
    letality: string;

}