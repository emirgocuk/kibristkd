import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}