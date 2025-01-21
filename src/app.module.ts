import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ModulesModule } from './modules/modules.module';
import { LoggerMiddleware } from './utils/middleware/logger.middleware';

@Module({
  imports: [ModulesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
