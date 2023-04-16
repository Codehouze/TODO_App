import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity({name:'user'})
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

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
