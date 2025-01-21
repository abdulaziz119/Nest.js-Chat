import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { chatsProviders } from "./chats.providers";
import { ChatsController } from "./chats.controller";
import { ChatsService } from "./chats.service";
import { chatUsersProviders } from "../chat-users/chat-users.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [ChatsController],
  providers: [...chatsProviders, ...chatUsersProviders, ChatsService],
})
export class ChatsModule {}
