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
import { MessageService } from "./message.service";
import {
  MessageCreateDto,
  MessageUpdateDto,
  SingleResponse,
} from "./dto/message.dto";
import { MessageEntity } from "../../entity/message.entity";

@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post("/add")
  @HttpCode(201)
  async create(
    @Body() body: MessageCreateDto,
  ): Promise<SingleResponse<MessageEntity>> {
    return this.messageService.create(body);
  }

  @Get("/findAll")
  @HttpCode(200)
  async findAll(
    @Query() query: PaginateParamsDto,
  ): Promise<PaginationResponse<MessageEntity[]>> {
    return this.messageService.findAll(query);
  }

  @Get("/findOne/:id")
  @HttpCode(200)
  async findOne(
    @Param() params: ParamIdNumberDto,
  ): Promise<SingleResponse<MessageEntity>> {
    return this.messageService.findOne(params);
  }

  @Put("/update")
  @HttpCode(202)
  async update(
    @Body() body: MessageUpdateDto,
  ): Promise<SingleResponse<MessageEntity>> {
    return this.messageService.update(body);
  }

  @Delete("/remove/:id")
  @HttpCode(204)
  async delete(@Param() params: ParamIdNumberDto): Promise<DeleteResult> {
    return this.messageService.delete(params);
  }
}
