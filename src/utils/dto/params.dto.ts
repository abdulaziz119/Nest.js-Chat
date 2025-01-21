import { IsDefined } from "class-validator";

export class ParamIdNumberDto {
  @IsDefined()
  id: number;
}
