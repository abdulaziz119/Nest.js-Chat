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
import { ChatUsersService } from "./chat-usres.service";
import { ChatUsersUpdateDto, SingleResponse } from "./dto/chta-users.dto";
import { ChatUsersEntity } from "../../entity/chat-users.entity";

@Controller("chat-users")
export class ChatUsersController {
  constructor(private readonly chatUsersService: ChatUsersService) {}

  @Get("/findAll")
  @HttpCode(200)
  async findAll(
    @Query() query: PaginateParamsDto,
  ): Promise<PaginationResponse<ChatUsersEntity[]>> {
    return this.chatUsersService.findAll(query);
  }

  @Get("/findOne/:id")
  @HttpCode(200)
  async findOne(
    @Param() params: ParamIdNumberDto,
  ): Promise<SingleResponse<ChatUsersEntity>> {
    return this.chatUsersService.findOne(params);
  }

  @Put("/update")
  @HttpCode(202)
  async update(
    @Body() body: ChatUsersUpdateDto,
  ): Promise<SingleResponse<ChatUsersEntity>> {
    return this.chatUsersService.update(body);
  }
}
