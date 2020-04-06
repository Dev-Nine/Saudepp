import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Notice} from './Notice';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @OneToMany(type => Notice, notice => notice.user)
    notices: Notice[];
}
