import type { Response } from 'express'
export class ResponseApi {

  public static successResponseWithCode<T>(res:Response,message: string, statusCode: number, result?: T): void{
    const response:ResponseInterface<T>={
      success:true,
      message:message,
      status_code:statusCode,
      result:result
    }
    res.status(statusCode).send(response).end();
  }

  public static successResponse<T>(message: string, statusCode: number, result?: T): ResponseInterface<T>{
    const response:ResponseInterface<T>={
      success:true,
      message:message,
      status_code:statusCode,
      result:result
    }
   return response;
  }

  public static faildResponseWithCode<T>(res:Response,message: string, statusCode: number): void{
    const response:ResponseInterface<T>={
      success:false,
      message:message,
      status_code:statusCode,
    }
    res.status(statusCode).send(response).end();
  }
  public static faildResponse<T>(message: string, statusCode: number):  ResponseInterface<T>{
    const response:ResponseInterface<T>={
      success:false,
      message:message,
      status_code:statusCode,
    }
    return response;
  }
}

export interface ResponseInterface<T>{
  success: boolean;
  message: string;
  status_code: number;
  result?: T;
}