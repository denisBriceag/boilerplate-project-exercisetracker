export class HttpSuccess<T> {
  status: number;
  data: T;

  constructor(data: T, status: number) {
    this.data = data;
    this.status = status;
  }
}
