import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";


@Entity()
@Unique(["date"])
export class CovidInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column({default: 0})
    confirmed: number;

    @Column({default: 0})
    recovered: number;

    @Column({default: 0})
    deaths: number; 

    @Column({default: 0})
    lethality: string;

}
