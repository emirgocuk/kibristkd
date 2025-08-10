import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Slider {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  subtitle!: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  linkHref!: string | null;

  @Column({ type: "int", default: 0 })
  sort!: number;

  @Column({ type: "bool", default: true })
  active!: boolean;

  @Column({ type: "longblob", nullable: true })
  imageBlob!: Buffer | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  imageMime!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
