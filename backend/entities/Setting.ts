import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Setting {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ default: true })
    allowAppPublishing!: boolean;
}
