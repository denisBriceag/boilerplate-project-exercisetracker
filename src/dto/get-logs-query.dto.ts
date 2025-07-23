import { IsOptional, IsDateString, IsInt, Min } from "class-validator";
import { Type } from "class-transformer";

export class GetLogsQueryDto {
  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;
}
