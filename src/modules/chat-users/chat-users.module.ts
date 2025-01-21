import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { ChatUsersController } from "./chat-users.controller";
import { chatUsersProviders } from "./chat-users.providers";
import { ChatUsersService } from "./chat-usres.service";

@Module({
  imports: [DatabaseModule],
  controllers: [ChatUsersController],
  providers: [...chatUsersProviders, ChatUsersService],
})
export class ChatUsersModule {}
