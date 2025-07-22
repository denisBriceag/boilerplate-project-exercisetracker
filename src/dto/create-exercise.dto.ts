import {
  IsString,
  IsInt,
  IsOptional,
  IsDateString,
  Min,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateExerciseDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  description: string;

  @IsInt()
  @Min(1)
  duration: number;

  @IsOptional()
  @IsDateString()
  date?: string;
}
