import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userName!: string;

  @Column()
  password!: string;

  @CreateDateColumn({
    type: "timestamp",
  })
  public createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  public updatedAt!: Date;
}

export default User;
