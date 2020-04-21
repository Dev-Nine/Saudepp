import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Notice} from './Notice';
import {Comment} from './Comment';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 8000, select: false })
    password: string;

    @Column({ length: 50 })
    email: string;

    @Column()
    type: number;
    // 0 -> admin
    // 1 -> moderador
    // 2 -> profissional
    // 3 -> comum

    @OneToMany(type => Notice, notice => notice.user)
    notices: Notice[];

    @OneToMany(type => Comment, comment => comment.author)
    comments: Comment[];

    public isValid(): boolean {
        if (this.name && this.password && this.email 
            && this.type && this.type >= 0 && this.type <= 3) 
        {
            return true;
        }
        return false;
    }
} 
