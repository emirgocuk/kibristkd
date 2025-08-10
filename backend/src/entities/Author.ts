import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 200 })
  name!: string;

  @Column({ type: "text", nullable: true })
  bio!: string | null;

  // Sosyal linkler için esnek alan
  @Column({ type: "json", nullable: true })
  socials!: any | null;

  // Avatar (blob)
  @Column({ type: "longblob", nullable: true })
  avatarBlob!: Buffer | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  avatarMime!: string | null;

  // İsteğe bağlı slug (UI’da gösteriliyor)
  @Column({ type: "varchar", length: 255, unique: true, nullable: true })
  slug!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
