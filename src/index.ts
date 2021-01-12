import "reflect-metadata";
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { Bots } from "./entities/index";
import { getConnection } from "typeorm";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);

  await getConnection("default")
    .createQueryBuilder()
    .update(Bots)
    .set({ bot_status: "notLogged" })
    .execute();
}

bootstrap();
