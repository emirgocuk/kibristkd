import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Makale {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  baslik!: string;

  @Column("text")
  icerik!: string;

  @Column({ length: 100 })
  kategori!: string;

  @Column({ type: "datetime" })
  tarih!: Date;

  @Column({ nullable: true })
  kapakResmi!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
