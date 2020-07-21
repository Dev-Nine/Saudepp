import {Entity, Column, PrimaryColumn, Generated} from "typeorm";

@Entity()
export class RecoverHistory {

    @PrimaryColumn({type:"uuid"})
    @Generated("uuid")
    id: string;

    @Column()
    created_at: Date;

    @Column({ length: 50 })
    email: string;
}
