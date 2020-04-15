import {Entity, Column, PrimaryColumn, OneToMany} from "typeorm";
import {SubTag} from "./SubTag";

@Entity()
export class Tag {

    @PrimaryColumn()
    id: string;

    @Column()
    description: string;

    @OneToMany(type => SubTag, subTag => subTag.tag, {
        eager: true
    })
    subTags: SubTag[];

    public isValid(): boolean {
        if (this.id && this.description) {
            return true;
        } 
        return false;
    }
}
