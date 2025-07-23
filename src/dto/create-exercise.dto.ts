import {
  IsString,
  IsInt,
  IsOptional,
  IsDateString,
  Min,
  MaxLength,
  MinLength,
  Max,
} from "class-validator";
import { Transform, Type } from "class-transformer";

export class CreateExerciseDto {
  @Type(() => Number)
  userId: number;

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  description: string;

  @IsInt()
  @Min(1)
  @Max(1000)
  @Type(() => Number)
  duration: number;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => {
    const date = new Date(value);

    return isNaN(date.getTime()) ? value : date.toISOString();
  })
  date?: string;
}
