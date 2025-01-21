import { IsDefined, IsNotEmpty, IsOptional } from "class-validator";

export class ChatsCreateDto {
  @IsDefined()
  name: string;

  @IsDefined()
  user: number;
}

export class ChatsUpdateDto {
  @IsDefined()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  name: string;
}
export interface SingleResponse<T> {
  result: T;
}
