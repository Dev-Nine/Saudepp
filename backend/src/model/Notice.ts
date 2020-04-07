import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from "./User";

@Entity()
export class Notice {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    date: Date;

    @Column()
    text: string;

    @ManyToOne(type => User, user => user.notices)
    user: User;

    public isValid(): boolean {
        if (this.title && this.date && this.text && this.user) {
            return true;
        } 
        return false;
    }
}
