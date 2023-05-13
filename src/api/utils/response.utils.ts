import type { Response } from 'express'
export class ResponseApi {

  public static paginateResponse<T>(message: string, statusCode: number, data: [T, number], page: number, limit: number): PaginationResponseInterface<T> {
    const [result, total] = data;
    const lastPage = Math.ceil(total / limit);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
      status_code: statusCode,
      message: message,
      success: true,
      result: result,
      count: total,
      currentPage: page,
      nextPage: nextPage,
      prevPage: prevPage,
      totalPage: lastPage,
    }
  }

  public static successResponseWithCode<T>(res: Response, message: string, statusCode: number, result?: T): void {
    const response: ResponseInterface<T> = {
      success: true,
      message: message,
      status_code: statusCode,
      result: result
    }
    res.status(statusCode).send(response).end();
  }

  public static successResponse<T>(message: string, statusCode: number, result?: T): ResponseInterface<T> {
    const response: ResponseInterface<T> = {
      success: true,
      message: message,
      status_code: statusCode,
      result: result
    }
    return response;
  }

  public static faildResponseWithCode<T>(res: Response, message: string, statusCode: number): void {
    const response: ResponseInterface<T> = {
      success: false,
      message: message,
      status_code: statusCode,
    }
    res.status(statusCode).send(response).end();
  }

  public static faildResponse<T>(message: string, statusCode: number): ResponseInterface<T> {
    const response: ResponseInterface<T> = {
      success: false,
      message: message,
      status_code: statusCode,
    }
    return response;
  }
}

export interface ResponseInterface<T> {
  success: boolean;
  message: string;
  status_code: number;
  result?: T;
}
export interface PaginationResponseInterface<T> {
  success: boolean;
  message: string;
  status_code: number;
  result?: T;
  count: number,
  currentPage: number,
  nextPage?: number,
  prevPage?: number,
  totalPage: number,
}