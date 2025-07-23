export class HttpError {
  constructor(
    public message: string | string[],
    public status: number,
  ) {
    this.message = message;
    this.status = status;
  }
}
