import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UsersModule } from "./users/users.module";
import { ChatsModule } from "./chats/chats.module";
import { ChatUsersModule } from "./chat-users/chat-users.module";
import { MessageModule } from "./message/message.module";

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ChatsModule,
    ChatUsersModule,
    MessageModule,
  ],
})
export class ModulesModule {}
