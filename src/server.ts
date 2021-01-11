import { create, Whatsapp } from "venom-bot";
import "reflect-metadata";
import { AppModule } from './app.module';
import { NestFactory } from "@nestjs/core";

create(
  "teste",
  undefined,
  async (statusSession, session) => {
    // return: isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
    console.log("statusSession: ", statusSession);
    console.log("Session: ", session);
  },
  undefined
)
.then((client) => start(client))
.catch((error) => console.log(error));

function start(client) {
  client.onMessage((message) => {
    if (message.body === 'Hi') {
      client.sendText(message.from, 'Welcome Venom 🕷');
    }
  });
} 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();