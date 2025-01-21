import { CHAT_SOURCE, MODELS } from "../../constants";
import { DataSource } from "typeorm";
import { MessageEntity } from "../../entity/message.entity";

export const messageProviders = [
  {
    provide: MODELS.MESSAGE,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MessageEntity),
    inject: [CHAT_SOURCE],
  },
];
