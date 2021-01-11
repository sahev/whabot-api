import bot from "venom-bot";
import { createSession } from '../db/db.js'

let data = {}

export default function creator(customerName) {

  bot.create(customerName).then(async (client) => {
      data = client;
      start(client);
    });

  function start(client) {
    client.onMessage((message) => {
      if(!message.isGroupMsg) {
        sendMessage(client, message.from, "auto resposta");
        console.log(message.from);
      }
    });
  }
  return data
}   


