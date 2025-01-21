import { CHAT_SOURCE, MODELS } from "../../constants";
import { DataSource } from "typeorm";
import { ChatEntity } from "../../entity/chats.entity";

export const chatsProviders = [
  {
    provide: MODELS.CHAT,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ChatEntity),
    inject: [CHAT_SOURCE],
  },
];
