import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne
} from "typeorm";
import { User } from "./User.js";

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 300 })
  text!: string;

  @Column({ type: "int", default: 0 })
  sort!: number;

  @Column({ type: "tinyint", width: 1, default: 1 })
  active!: boolean;

  @ManyToOne(() => User, { nullable: true })
  createdBy!: User | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
