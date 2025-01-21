import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { PaginationResponse } from "../../utils/pagination.response";
import { DeleteResult } from "typeorm";
import { ParamIdNumberDto } from "../../utils/dto/params.dto";
import { PaginateParamsDto } from "../../utils/dto/paginate.dto";
import { ChatsService } from "./chats.service";
import {
  ChatsCreateDto,
  ChatsUpdateDto,
  SingleResponse,
} from "./dto/chats.dto";
import { ChatEntity } from "../../entity/chats.entity";

@Controller("chats")
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post("/add")
  @HttpCode(201)
  async create(
    @Body() body: ChatsCreateDto,
  ): Promise<SingleResponse<ChatEntity>> {
    return this.chatsService.create(body);
  }

  @Get("/findAll")
  @HttpCode(200)
  async findAll(
    @Query() query: PaginateParamsDto,
  ): Promise<PaginationResponse<ChatEntity[]>> {
    return this.chatsService.findAll(query);
  }

  @Get("/findOne/:id")
  @HttpCode(200)
  async findOne(
    @Param() params: ParamIdNumberDto,
  ): Promise<SingleResponse<ChatEntity>> {
    return this.chatsService.findOne(params);
  }

  @Put("/update")
  @HttpCode(202)
  async update(
    @Body() body: ChatsUpdateDto,
  ): Promise<SingleResponse<ChatEntity>> {
    return this.chatsService.update(body);
  }

  @Delete("/remove/:id")
  @HttpCode(204)
  async delete(@Param() params: ParamIdNumberDto): Promise<DeleteResult> {
    return this.chatsService.delete(params);
  }
}
