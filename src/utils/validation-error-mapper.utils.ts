import { ValidationError } from "class-validator";

export function mapValidationErrors(errors: ValidationError[]): string[] {
  return errors
    .map((error) =>
      Object.values(
        error.constraints as { [p: string]: string } | ArrayLike<string>,
      ),
    )
    .flat();
}
