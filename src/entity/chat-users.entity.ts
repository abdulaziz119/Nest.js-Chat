import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { ChatEntity } from "./chats.entity";
import { UserEntity } from "./users.entity";

@Entity({ name: "chat_users", synchronize: true })
export class ChatUsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  chatId: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => ChatEntity, (chat) => chat.chatUsers, {
    onDelete: "CASCADE",
  })
  chat: ChatEntity;

  @ManyToOne(() => UserEntity, (user) => user.chatUsers, {
    onDelete: "CASCADE",
  })
  user: UserEntity;

  @DeleteDateColumn()
  deleted_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
