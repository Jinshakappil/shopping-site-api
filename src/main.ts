import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 app.enableCors({
    origin: 'http://localhost:3000', // your React frontend URL
    credentials: true, // if using cookies or sessions
  });
  await app.listen(4000);
}
bootstrap();
