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
import { UserEntity } from "../../entity/users.entity";
import { PaginateParamsDto } from "../../utils/dto/paginate.dto";
import {
  SingleResponse,
  UsersCreateDto,
  UsersUpdateDto,
} from "./dto/users.dto";
import { ParamIdNumberDto } from "../../utils/dto/params.dto";

@Injectable()
export class UsersService {
  constructor(
    @Inject(MODELS.USER)
    private readonly usersRepo: Repository<UserEntity>,
  ) {}

  async findAll(
    payload: PaginateParamsDto,
  ): Promise<PaginationResponse<UserEntity[]>> {
    const page: number = payload.page || 1;
    const limit: number = payload.limit || 10;
    const count: number = await this.usersRepo.count();
    if (!count) return getPaginationResponse([], page, limit, count);
    const serverKeys = await this.usersRepo.find({
      where: {},
      skip: (page - 1) * limit,
      take: limit,
    });
    if (limit && !isNaN(page))
      return getPaginationResponse<UserEntity>(serverKeys, page, limit, count);
  }

  async findOne(body: ParamIdNumberDto): Promise<SingleResponse<UserEntity>> {
    const { id } = body;
    try {
      const serverKeys: UserEntity = await this.usersRepo.findOne({
        where: { id: id },
      });
      if (!serverKeys) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return { result: serverKeys };
    } catch (error) {
      throw new HttpException(
        { message: `Failed to get user with ID ${id}`, error: error.detail },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(payload: UsersCreateDto): Promise<SingleResponse<UserEntity>> {
    const UserData = new UserEntity();
    UserData.username = payload.username;
    try {
      return { result: await this.usersRepo.save(UserData) };
    } catch (error) {
      throw new HttpException(
        {
          message: "Failed to create user",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(payload: UsersUpdateDto): Promise<SingleResponse<UserEntity>> {
    const { id } = payload;

    const Users: UserEntity = await this.usersRepo.findOneBy({ id: id });

    if (!Users) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    try {
      Object.entries(Users).forEach(([key, value]) => {
        Users[key] = payload[key] || value;
      });
      return { result: await this.usersRepo.save(Users) };
    } catch (error) {
      throw new HttpException(
        {
          message: "Failed to update user",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(params: ParamIdNumberDto): Promise<DeleteResult> {
    const { id } = params;
    return this.usersRepo.softDelete(id);
  }
}
