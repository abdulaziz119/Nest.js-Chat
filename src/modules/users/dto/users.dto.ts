import { IsDefined, IsNotEmpty, IsOptional } from "class-validator";

export class UsersCreateDto {
  @IsDefined()
  username: string;
}

export class UsersUpdateDto {
  @IsDefined()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  username: string;
}
export interface SingleResponse<T> {
  result: T;
}
