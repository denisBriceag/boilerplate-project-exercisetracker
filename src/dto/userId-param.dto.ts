import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class UserIdParamDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  _id: number;
}
