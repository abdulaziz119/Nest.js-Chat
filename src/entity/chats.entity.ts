import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { MessageEntity } from "./message.entity";
import { ChatUsersEntity } from "./chat-users.entity";

@Entity({ name: "chats", synchronize: true })
export class ChatEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;

  @OneToMany(() => MessageEntity, (message) => message.chat)
  messages: MessageEntity[];

  @OneToMany(() => ChatUsersEntity, (chatUser) => chatUser.chat)
  chatUsers: ChatUsersEntity[];
  user: number;

  @DeleteDateColumn()
  deleted_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
