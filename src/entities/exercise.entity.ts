import { Entity, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class Exercise extends BaseEntity {
  @Column()
  description: string;

  @Column("int")
  duration: number;

  @Column({ type: "datetime" })
  date: Date;

  @ManyToOne(() => User, (user) => user.exercises, { onDelete: "CASCADE" })
  user: User;
}
