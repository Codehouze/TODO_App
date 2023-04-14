import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from "typeorm";

@Entity({ name: "todo" })
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ default: false })
  completed!: boolean;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    type: "timestamp",
  })
  deletedAt?: Date;
}

export default Todo;
