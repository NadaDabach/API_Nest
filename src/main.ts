import { NestFactory } from '@nestjs/core';
import { SchoolModule } from './school.module';
import { ValidationPipe} from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(SchoolModule);
  app.useGlobalPipes(new ValidationPipe);
  const port = process.env.PORT;
  await app.listen(port); //var environment recup ici
}
bootstrap();
