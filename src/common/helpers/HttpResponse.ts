export class HttpException extends Error {
  status: number;
  message: string;
  error: any;
  constructor(status: number, error?: any, message?: string) {
    super(message);
    this.status = status;
    this.error = error;
    this.message = message;
  }
}

export class HttpSuccess {
  status: number | string;
  message: string;
  results: any;
  constructor(status: number | string, results: any, message?: string) {
    this.status = status;
    this.results = results;
    this.message = message || "success";
  }
}
