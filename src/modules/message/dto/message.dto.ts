import { IsDefined, IsNotEmpty, IsOptional } from "class-validator";

export class MessageCreateDto {
  @IsDefined()
  chat: number;

  @IsDefined()
  author: number;

  @IsDefined()
  text: string;
}

export class MessageUpdateDto {
  @IsDefined()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  chat: number;

  @IsOptional()
  @IsNotEmpty()
  author: number;

  @IsOptional()
  @IsNotEmpty()
  text: string;
}
export interface SingleResponse<T> {
  result: T;
}
