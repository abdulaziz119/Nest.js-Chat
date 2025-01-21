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
import { UserEntity } from "../../entity/users.entity";
import { UsersService } from "./users.service";
import {
  SingleResponse,
  UsersCreateDto,
  UsersUpdateDto,
} from "./dto/users.dto";
import { ParamIdNumberDto } from "../../utils/dto/params.dto";
import { PaginateParamsDto } from "../../utils/dto/paginate.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/add")
  @HttpCode(201)
  async create(
    @Body() body: UsersCreateDto,
  ): Promise<SingleResponse<UserEntity>> {
    return this.usersService.create(body);
  }

  @Get("/findAll")
  @HttpCode(200)
  async findAll(
    @Query() query: PaginateParamsDto,
  ): Promise<PaginationResponse<UserEntity[]>> {
    return this.usersService.findAll(query);
  }

  @Get("/findOne/:id")
  @HttpCode(200)
  async findOne(
    @Param() params: ParamIdNumberDto,
  ): Promise<SingleResponse<UserEntity>> {
    return this.usersService.findOne(params);
  }

  @Put("/update")
  @HttpCode(202)
  async update(
    @Body() body: UsersUpdateDto,
  ): Promise<SingleResponse<UserEntity>> {
    return this.usersService.update(body);
  }

  @Delete("/remove/:id")
  @HttpCode(204)
  async delete(@Param() params: ParamIdNumberDto): Promise<DeleteResult> {
    return this.usersService.delete(params);
  }
}
