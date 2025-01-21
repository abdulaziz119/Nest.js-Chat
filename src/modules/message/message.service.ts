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
  MessageCreateDto,
  MessageUpdateDto,
  SingleResponse,
} from "./dto/message.dto";
import { MessageEntity } from "../../entity/message.entity";

@Injectable()
export class MessageService {
  constructor(
    @Inject(MODELS.MESSAGE)
    private readonly messageRepo: Repository<MessageEntity>,
  ) {}

  async findAll(
    payload: PaginateParamsDto,
  ): Promise<PaginationResponse<MessageEntity[]>> {
    const page: number = payload.page || 1;
    const limit: number = payload.limit || 10;
    const count: number = await this.messageRepo.count();
    if (!count) return getPaginationResponse([], page, limit, count);
    const serverKeys = await this.messageRepo.find({
      where: {},
      skip: (page - 1) * limit,
      take: limit,
    });
    if (limit && !isNaN(page))
      return getPaginationResponse<MessageEntity>(
        serverKeys,
        page,
        limit,
        count,
      );
  }

  async findOne(
    body: ParamIdNumberDto,
  ): Promise<SingleResponse<MessageEntity>> {
    const { id } = body;
    try {
      const serverKeys: MessageEntity = await this.messageRepo.findOne({
        where: { id: id },
      });
      if (!serverKeys) {
        throw new NotFoundException(`Message with ID ${id} not found`);
      }
      return { result: serverKeys };
    } catch (error) {
      throw new HttpException(
        { message: `Failed to get message with ID ${id}`, error: error.detail },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    payload: MessageCreateDto,
  ): Promise<SingleResponse<MessageEntity>> {
    const UserData = new MessageEntity();
    UserData.author = payload.author;
    UserData.chat = payload.chat;
    UserData.text = payload.text;
    try {
      return { result: await this.messageRepo.save(UserData) };
    } catch (error) {
      throw new HttpException(
        {
          message: "Failed to create message",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    payload: MessageUpdateDto,
  ): Promise<SingleResponse<MessageEntity>> {
    const { id } = payload;

    const Users: MessageEntity = await this.messageRepo.findOneBy({ id: id });

    if (!Users) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    try {
      Object.entries(Users).forEach(([key, value]) => {
        Users[key] = payload[key] || value;
      });
      return { result: await this.messageRepo.save(Users) };
    } catch (error) {
      throw new HttpException(
        {
          message: "Failed to update message",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(params: ParamIdNumberDto): Promise<DeleteResult> {
    const { id } = params;
    return this.messageRepo.softDelete(id);
  }
}
