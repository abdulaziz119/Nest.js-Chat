import "reflect-metadata";
import { DataSource } from "typeorm";
import { CHAT_SOURCE } from "../constants";
import { DB_DB, DB_HOST, DB_PASS, DB_PORT, DB_USER } from "../utils/env";
import { MessageEntity } from "../entity/message.entity";
import { ChatUsersEntity } from "../entity/chat-users.entity";
import { UserEntity } from "../entity/users.entity";
import { ChatEntity } from "../entity/chats.entity";

export const databaseProviders = [
  {
    provide: CHAT_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "postgres",
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASS,
        database: DB_DB,
        synchronize: true,
        logging: false,
        schema: "public",
        entities: [ChatEntity, MessageEntity, UserEntity, ChatUsersEntity],
      });
      await dataSource.initialize();
      return dataSource;
    },
  },
];
