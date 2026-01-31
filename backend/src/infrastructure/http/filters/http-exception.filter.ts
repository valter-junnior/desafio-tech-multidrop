import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import type { LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message:
        typeof message === 'string'
          ? message
          : (message as any).message || message,
    };

    // Log do erro
    const logMessage = `${request.method} ${request.url} - Status: ${status}`;
    const errorDetails = {
      ...errorResponse,
      body: request.body,
      query: request.query,
      params: request.params,
      user: (request as any).user?.id || 'anonymous',
      ip: request.ip,
      userAgent: request.get('user-agent'),
    };

    if (status >= 500) {
      // Erros de servidor (500+) - Log de erro com stack trace
      this.logger.error?.(
        logMessage,
        exception instanceof Error
          ? exception.stack
          : JSON.stringify(exception),
        'HttpExceptionFilter',
      );

      // Log detalhes em JSON para análise
      this.logger.error?.(
        JSON.stringify(errorDetails),
        '',
        'HttpExceptionFilter',
      );
    } else if (status >= 400) {
      // Erros de cliente (400-499) - Log de warning
      this.logger.warn?.(
        `${logMessage} - ${JSON.stringify(errorResponse.message)}`,
        'HttpExceptionFilter',
      );
    }

    response.status(status).json(errorResponse);
  }
}
