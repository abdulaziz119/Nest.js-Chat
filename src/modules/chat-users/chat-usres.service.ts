import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { MODELS } from "../../constants";
import { PaginationResponse } from "../../utils/pagination.response";
import { getPaginationResponse } from "../../utils/pagination.builder";
import { PaginateParamsDto } from "../../utils/dto/paginate.dto";
import { ParamIdNumberDto } from "../../utils/dto/params.dto";
import { ChatUsersEntity } from "../../entity/chat-users.entity";
import { ChatUsersUpdateDto, SingleResponse } from "./dto/chta-users.dto";

@Injectable()
export class ChatUsersService {
  constructor(
    @Inject(MODELS.CHAT_USER)
    private readonly chatUsersRepo: Repository<ChatUsersEntity>,
  ) {}

  async findAll(
    payload: PaginateParamsDto,
  ): Promise<PaginationResponse<ChatUsersEntity[]>> {
    const page: number = payload.page || 1;
    const limit: number = payload.limit || 10;
    const count: number = await this.chatUsersRepo.count();
    if (!count) return getPaginationResponse([], page, limit, count);
    const serverKeys = await this.chatUsersRepo.find({
      where: {},
      skip: (page - 1) * limit,
      take: limit,
    });
    if (limit && !isNaN(page))
      return getPaginationResponse<ChatUsersEntity>(
        serverKeys,
        page,
        limit,
        count,
      );
  }

  async findOne(
    body: ParamIdNumberDto,
  ): Promise<SingleResponse<ChatUsersEntity>> {
    const { id } = body;
    try {
      const serverKeys: ChatUsersEntity = await this.chatUsersRepo.findOne({
        where: { id: id },
      });
      if (!serverKeys) {
        throw new NotFoundException(`Chat user with ID ${id} not found`);
      }
      return { result: serverKeys };
    } catch (error) {
      throw new HttpException(
        {
          message: `Failed to get chat user with ID ${id}`,
          error: error.detail,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    payload: ChatUsersUpdateDto,
  ): Promise<SingleResponse<ChatUsersEntity>> {
    const { id } = payload;

    const Chats: ChatUsersEntity = await this.chatUsersRepo.findOneBy({
      id: id,
    });

    if (!Chats) {
      throw new NotFoundException(`Chat user with ID ${id} not found`);
    }
    try {
      Object.entries(Chats).forEach(([key, value]) => {
        Chats[key] = payload[key] || value;
      });
      return { result: await this.chatUsersRepo.save(Chats) };
    } catch (error) {
      throw new HttpException(
        {
          message: "Failed to update chat user",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
