import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index
} from "typeorm";

@Entity()
export class SliderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ default: true })
  active!: boolean;

  @Column({ type: "int", default: 0 })
  sort!: number;

  @Column({ length: 200 })
  title!: string;

  @Column({ length: 300, nullable: true })
  subtitle!: string | null;

  @Column({ length: 300, nullable: true })
  linkHref!: string | null;

  @Column({ type: "longblob", nullable: true })
  imageBlob!: Buffer | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  imageMime!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
