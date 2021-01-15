import "reflect-metadata";
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { Bots, Workflows } from "./entities/index";
import { getConnection } from "typeorm";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);

  preparedb();
  
}

async function preparedb() {
  await getConnection("default")
  .createQueryBuilder()
  .update(Bots)
  .set({ bot_status: "notLogged" })
  .execute();

  // await getConnection("default")
  // .createQueryBuilder()
  // .update(Workflows)
  // .set({ wor_stage: 0 })
  // .execute();  
}

bootstrap();
