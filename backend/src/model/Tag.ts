import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    description: string;
}
