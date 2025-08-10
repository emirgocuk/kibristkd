import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index, Unique
} from "typeorm";
import { Makale } from "./Makale.js";

@Entity()
@Unique(["slug"])
export class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 140 })
  name!: string;

  @Index()
  @Column({ length: 160 })
  slug!: string;

  @Column({ type: "text", nullable: true })
  bio!: string | null;

  @Column({ type: "simple-json", nullable: true })
  socials!: { twitter?: string; instagram?: string; website?: string } | null;

  // avatar blob + mime
  @Column({ type: "longblob", nullable: true })
  avatarBlob!: Buffer | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  avatarMime!: string | null;

  @OneToMany(() => Makale, (m) => m.author)
  posts!: Makale[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
