import {Entity, Column, PrimaryColumn, ManyToOne} from "typeorm";
import { Tag } from "./Tag";

@Entity()
export class SubTag {

    @PrimaryColumn()
    id: string;

    @Column()
    description: string;

    @ManyToOne(type => Tag, tag => tag.subTags)
    tag: Tag;

    public isValid(): boolean {
        if (this.id && this.description && this.tag) {
            return true;
        } 
        return false;
    }
}
