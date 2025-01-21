import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { DeleteResult, Repository } from "typeorm";
import { MODELS } from "../../constants";
import { PaginationResponse } from "../../utils/pagination.response";
import { getPaginationResponse } from "../../utils/pagination.builder";
import { PaginateParamsDto } from "../../utils/dto/paginate.dto";
import { ParamIdNumberDto } from "../../utils/dto/params.dto";
import {
  ChatsCreateDto,
  ChatsUpdateDto,
  SingleResponse,
} from "./dto/chats.dto";
import { ChatEntity } from "../../entity/chats.entity";
import { ChatUsersEntity } from "../../entity/chat-users.entity";

@Injectable()
export class ChatsService {
  constructor(
    @Inject(MODELS.CHAT)
    private readonly chatsRepo: Repository<ChatEntity>,
    @Inject(MODELS.CHAT_USER)
    private readonly chatUsersRepo: Repository<ChatUsersEntity>,
  ) {}

  async findAll(
    payload: PaginateParamsDto,
  ): Promise<PaginationResponse<ChatEntity[]>> {
    const page: number = payload.page || 1;
    const limit: number = payload.limit || 10;
    const count: number = await this.chatsRepo.count();
    if (!count) return getPaginationResponse([], page, limit, count);
    const serverKeys = await this.chatsRepo.find({
      where: {},
      skip: (page - 1) * limit,
      take: limit,
    });
    if (limit && !isNaN(page))
      return getPaginationResponse<ChatEntity>(serverKeys, page, limit, count);
  }

  async findOne(body: ParamIdNumberDto): Promise<SingleResponse<ChatEntity>> {
    const { id } = body;
    try {
      const serverKeys = await this.chatsRepo.findOne({
        where: { id: id },
      });
      if (!serverKeys) {
        throw new NotFoundException(`Chat with ID ${id} not found`);
      }
      return { result: serverKeys };
    } catch (error) {
      throw new HttpException(
        { message: `Failed to get chat with ID ${id}`, error: error.detail },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(payload: ChatsCreateDto): Promise<SingleResponse<ChatEntity>> {
    try {
      const chatData = new ChatEntity();
      chatData.name = payload.name;
      chatData.user = payload.user;

      const savedChat: ChatEntity = await this.chatsRepo.save(chatData);

      await this.chatUsersRepo.save({
        chatId: savedChat.id,
        userId: payload.user,
      });

      return { result: savedChat };
    } catch (error) {
      throw new HttpException(
        {
          message: "Failed to create chat",
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(payload: ChatsUpdateDto): Promise<SingleResponse<ChatEntity>> {
    const { id } = payload;

    const Chats: ChatEntity = await this.chatsRepo.findOneBy({ id: id });

    if (!Chats) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }
    try {
      Object.entries(Chats).forEach(([key, value]) => {
        Chats[key] = payload[key] || value;
      });
      return { result: await this.chatsRepo.save(Chats) };
    } catch (error) {
      throw new HttpException(
        {
          message: "Failed to update chat",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(params: ParamIdNumberDto): Promise<DeleteResult> {
    const { id } = params;
    return this.chatsRepo.softDelete(id);
  }
}
