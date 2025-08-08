import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./user.js";

export enum MakaleStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}

@Entity()
export class Makale {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    content!: string;

    @Column({
        type: "enum",
        enum: MakaleStatus,
        default: MakaleStatus.PENDING
    })
    status!: MakaleStatus;

    @ManyToOne('User', (user: User) => user.makaleler)
    author!: User;
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
