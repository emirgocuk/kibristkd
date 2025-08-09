import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class DevelopmentNote {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    content!: string;

    @CreateDateColumn()
    createdAt!: Date;
}
