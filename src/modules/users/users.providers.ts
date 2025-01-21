import { CHAT_SOURCE, MODELS } from "../../constants";
import { DataSource } from "typeorm";
import { UserEntity } from "../../entity/users.entity";

export const usersProviders = [
  {
    provide: MODELS.USER,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [CHAT_SOURCE],
  },
];
