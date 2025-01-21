import { IsDefined, IsNotEmpty, IsOptional } from "class-validator";

export class ChatUsersUpdateDto {
  @IsDefined()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  chat_id: number;

  @IsOptional()
  @IsNotEmpty()
  user_id: number;
}
export interface SingleResponse<T> {
  result: T;
}
