import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Notice} from './Notice';
import {Comment} from './Comment';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50})
    name: string;

    @Column()
    password: string;

    @Column({ length: 50 })
    email: string;

    @OneToMany(type => Notice, notice => notice.user)
    notices: Notice[];

    @OneToMany(type => Comment, comment => comment.author)
    comments: Comment[];

    public isValid(): boolean {
        if (this.name && this.password && this.email) {
            return true;
        }
        return false;
    }
} 
