import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      return this.logHttpCall(context, next);
    }
  }

  private logHttpCall(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.get('user-agent') || '';
    const { ip, method, path: url, body } = request;
    const correlationKey = uuidv4();

    if (String(context.getClass().name) != 'PrometheusController') {
      this.logger.info(
        `[${correlationKey}] ${method} ${userAgent} ${url} ${JSON.stringify(
          body
        )} ${ip}: ${context.getClass().name} ${context.getHandler().name}`
      );
    }

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();

        const { statusCode } = response;
        const contentLength = response.get('content-length');

        this.logger.log(
          `[${correlationKey}] ${method} ${url} ${statusCode} ${contentLength}: ${
            Date.now() - now
          }ms`
        );
      })
    );
  }
}
