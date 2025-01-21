import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ChatEntity } from "./chats.entity";
import { UserEntity } from "./users.entity";

@Entity({ name: "messages", synchronize: true })
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ChatEntity, (chat) => chat.messages, { onDelete: "CASCADE" })
  chat: number;

  @ManyToOne(() => UserEntity, (user) => user.messages, { onDelete: "CASCADE" })
  author: number;

  @Column("text")
  text: string;

  @DeleteDateColumn()
  deleted_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
