import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ChatUsersEntity } from "./chat-users.entity";
import { MessageEntity } from "./message.entity";

@Entity({ name: "users", synchronize: true })
@Unique(["username"])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @OneToMany(() => MessageEntity, (message) => message.author)
  messages: MessageEntity[];

  @OneToMany(() => ChatUsersEntity, (chatUser) => chatUser.user)
  chatUsers: ChatUsersEntity[];

  @DeleteDateColumn()
  deleted_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
