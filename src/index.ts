import "reflect-metadata";
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import startupDb from "./utils/startup"


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let st = new startupDb();
  app.enableCors();
  await app.listen(3000);
  
  await st.defaultData();
  
}

bootstrap();
