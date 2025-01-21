import { CHAT_SOURCE, MODELS } from "../../constants";
import { DataSource } from "typeorm";
import { ChatUsersEntity } from "../../entity/chat-users.entity";

export const chatUsersProviders = [
  {
    provide: MODELS.CHAT_USER,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ChatUsersEntity),
    inject: [CHAT_SOURCE],
  },
];
