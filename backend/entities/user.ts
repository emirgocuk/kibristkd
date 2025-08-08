// ...existing code...
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Makale } from "./Makale.js";

export enum UserRole {
    SUPERADMIN = "superadmin",
    ADMIN = "admin",
    YAZAR = "yazar"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.YAZAR
    })
    role!: UserRole;

    @OneToMany('Makale', (makale: Makale) => makale.author)
    makaleler!: Makale[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}