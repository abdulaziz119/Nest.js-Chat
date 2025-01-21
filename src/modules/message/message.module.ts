import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { messageProviders } from "./message.providers";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [MessageController],
  providers: [...messageProviders, MessageService],
})
export class MessageModule {}
