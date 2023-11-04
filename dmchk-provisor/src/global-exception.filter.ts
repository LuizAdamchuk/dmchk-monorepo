import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(
      '🚀 ~ file: global-exception.filter.ts:13 ~ GlobalExceptionFilter ~ exception:',
      exception
    );
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception?.response?.statusCode) {
      switch (exception?.response?.statusCode) {
        case 400:
          response.status(400).json({
            statusCode: 400,
            message: exception?.response?.message,
          });
          break;
        case 401:
          response.status(401).json({
            statusCode: 401,
            message: 'Unauthorized',
          });

          break;
        case 403:
          response.status(403).json({
            statusCode: 403,
            message: 'Forbidden',
          });
          break;
        case 404:
          response.status(404).json({
            statusCode: 404,
            message: exception?.response?.message,
          });
          break;

        default:
          response.status(500).json({
            message: 'Internal server error',
          });
          break;
      }
    } else {
      switch (true) {
        case exception instanceof NotFoundException:
          response.status(404).json({
            statusCode: 404,
            message: exception.message,
          });
          break;

        case exception instanceof UnauthorizedException:
          response.status(401).json({
            statusCode: 401,
            message: exception.message,
          });
          break;

        case exception instanceof BadRequestException:
          response.status(400).json({
            statusCode: 400,
            message: exception.message,
          });
          break;

        default:
          response.status(500).json({
            message: 'Internal server error',
          });
          break;
      }
    }
  }
}
