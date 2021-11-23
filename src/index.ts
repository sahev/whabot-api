import "reflect-metadata";
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import startupDb from "./utils/startup"

const port = 3001
const hostname = 'localhost'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let st = new startupDb();
  app.enableCors();
  await app.listen(port,  hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
    
  });
  
  await st.defaultData();
  
}

bootstrap();
