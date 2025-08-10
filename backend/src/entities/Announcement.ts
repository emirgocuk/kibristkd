import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  message!: string | null;

  @Column({ type: "bool", default: true })
  active!: boolean;

  @Column({ type: "int", default: 0 })
  sort!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
