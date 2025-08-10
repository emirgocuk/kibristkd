import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
  CreateDateColumn, UpdateDateColumn, RelationId
} from "typeorm";
import { User } from "./User.js";

export type MakaleStatus = "draft" | "pending" | "published";

@Entity()
export class Makale {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  baslik!: string;

  @Column({ type: "longtext" })
  icerik!: string;

  @Column({ type: "varchar", length: 191, nullable: true, default: null })
  kategori!: string | null;

  @Column({ type: "varchar", length: 1024, nullable: true, default: null })
  kapakResmi!: string | null;

  @Column({ type: "enum", enum: ["draft", "pending", "published"], default: "pending" })
  status!: MakaleStatus;

  @ManyToOne(() => User, { eager: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "createdById" })
  createdBy!: User | null;

  @RelationId((m: Makale) => m.createdBy)
  createdById!: number | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
