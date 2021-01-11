import bot from "venom-bot";
import express from "express";
import bodyParser from "body-parser";
import { routes, setClients } from "./api/routes.js";
import creator from "./api/creator.js";
import { connect, getSession, getSessionNames, setStateSession } from "./db/db.js";
import { sendMessage } from "./api/sender.js";



const app = express();
const { Whatsapp } = bot
let clients = [];

app.listen(3000, () => {
  console.log("api started");
});
app.use(bodyParser.json());

connect();

getSessionNames().then((users) => {
  users.map(async (user) => {
    let sessionName = user.cst_name

      bot
      .create(
        sessionName,
        undefined,
        async (statusSession, session) => {
          // return: isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
          if (statusSession !== 'inChat' && statusSession !== 'isLogged' ) {
            await setStateSession(sessionName, 0)
          } else { 
            await setStateSession(sessionName, 1)
          }
        },
        undefined
      )
      .then((client) => start(client))
      .catch((error) => console.log(error));
  });
});


function start(client) {
  client.onMessage((message) => {
    if (!message.isGroupMsg) {
      sendMessage(client, message.from, "auto resposta");
      console.log(message.from);
    }
  });
}

routes(app, setClients(clients));
