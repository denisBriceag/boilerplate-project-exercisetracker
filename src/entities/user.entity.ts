import { Column, Entity, OneToMany } from "typeorm";
import { Exercise } from "./exercise.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercises: Exercise[];
}
