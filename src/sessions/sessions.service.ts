import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Whatsapp } from "venom-bot";
import { setBotStatusDTO } from "../bots/botsDTO";
import { Bots, Messages } from "../entities";
import { Chats } from '../chats/chats.entities'
import { BrowserData } from "./BrowserData";
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { Stages } from "../flows/stages/stages.entities";
import { rmSync } from 'fs'
import { join } from 'path'
import pino from 'pino'
import { Boom } from '@hapi/boom'
import makeWASocket, {
  useMultiFileAuthState,
  makeInMemoryStore,
  DisconnectReason,
  delay,
} from '@adiwajshing/baileys'
import { ChatsServices } from "src/chats/chats.service";
import { QueueService } from "src/messagequeue/queue.service";
import { Documents } from "src/nlp/documents/documents.entities";
import { Responses } from "src/nlp/responses/responses.entities";
import { DocumentsService } from "src/nlp/documents/documents.service";
import { NlpManager } from 'node-nlp'
import { ResponsesService } from "src/nlp/responses/responses.service";
 
@Injectable()
@WebSocketGateway()
export class SessionsService {
  @WebSocketServer() server: Server;
  constructor(
    @InjectRepository(Bots) public botsRepository: Repository<Bots>,
    @InjectRepository(Messages) private messagesRepository: Repository<Messages>,
    @InjectRepository(Chats) public chatsRepository: Repository<Chats>,
    @InjectRepository(Stages) public staRepository: Repository<Stages>,
    @InjectRepository(Documents) public documentsRepository: Repository<Documents>,
    private queueService: QueueService,
    private documentsService: DocumentsService,
    private responsesService: ResponsesService
  ) {    
  }


  async getSessionTokenBrowser(data: any) {
    return new Whatsapp(data).getSessionTokenBrowser();
  }

  async logout(clientId) {

    deleteSession(parseInt(clientId));
    console.log('logout id', clientId);
    this.setBotStatus(parseInt(clientId), { bot_status: "notLogged", bot_lastStatus: "notLogged" })
    this.queueService.closeConnection().subscribe().closed;

  }

  getClient(data: any, clientName: any) {
    let resp = [];
    data.map((res) => {
      if (res.session === clientName) resp = res;
    });
    return resp;
  }

  async getBot(botId: number) {
    return await this.botsRepository.findOne({ bot_bot: botId });
  }

  async setBotStatus(botId: number, data: setBotStatusDTO) {
    const obj = { bot_bot: botId, bot_status: data.bot_status, bot_lastStatus: data.bot_lastStatus }

    await this.botsRepository.update({ bot_bot: botId }, data);
    this.onUpdatedBots(obj);
  }

  @SubscribeMessage("onUpdatedBots")
  onUpdatedBots(@MessageBody() data: {}): void {
    this.server.emit("onUpdatedBots", data);
  }

  @SubscribeMessage("qrCodeStringUpdate")
  qrCodeStringUpdate(@MessageBody() data: {}): void {
    this.server.emit("qrCodeStringUpdate", data);
  }

  async startBot(botId) {
    var res = await this.createSession(botId)
    
    var data = {
      bot_bot: botId,
      bot_status: res.status,
      bot_lastStatus: res.status

    }
  
    this.setBotStatus(botId, data);
    return res
  }



  start(client, botId) {
    console.log('starting bot');

    new BrowserData(client);

    //descomentar e retirar o trecho de cima
    // return new BotsServices(this.botsRepository, this.messagesRepository, this.chatsRepository).botInit(
    //   client, botId
    // );
  }

  async getBotStatus(botId) {
    return await status(botId);
  }

  async createSession(sessionId, isLegacy = false, res = null) {

    const manager = new NlpManager({ languages: ['pt'], forceNER: true });

    let statusBot = await status(sessionId);



    if(statusBot.status == 'authenticated')
      return statusBot;

    const sessionFile = (isLegacy ? 'legacy_' : 'md_') + sessionId + (isLegacy ? '.json' : '')

    const logger = pino({ level: 'silent' })
    const store = makeInMemoryStore({ logger })

    const { state, saveCreds } = await useMultiFileAuthState(sessionsDir(sessionFile))
    let SocketConfig = {
      auth: state,
      printQRInTerminal: false
    }



    const wa = makeWASocket(SocketConfig);

    sessions.set(sessionId, { ...wa, store, isLegacy })

    wa.ev.on('creds.update', saveCreds);

    wa.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update

      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut &&
          (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.connectionReplaced;

        // console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
        // reconnect if not logged out
        if (shouldReconnect) {
          this.createSession(sessionId, false, null)
        }
      } else if (connection === 'open') {
        console.log('opened connection')
        var data = {
          bot_bot: sessionId,
          bot_status: "authenticated",
          bot_lastStatus: "authenticated"
        }

        this.setBotStatus(sessionId, data);

        this.queueService.connectMessageQueue().subscribe().closed;
          
        let documents = await this.documentsService.findAllByBot(sessionId);  

        documents.map(document => {
          manager.addDocument(document.doc_language, document.doc_text, document.doc_intent)
        })
        
        let responses = await this.responsesService.findAllByBot(sessionId);
        
        responses.map(response => {
          manager.addAnswer(response.res_language, response.res_intent, response.res_text)
        })

        await manager.train();
        manager.save();

      }

      if (update.qr) {
        this.qrCodeStringUpdate(update.qr);
      }

    })

    // Automatically read incoming messages, uncomment below codes to enable this behaviour
    /*
    wa.ev.on('messages.upsert', async (m) => {
        const message = m.messages[0]
        if (!message.key.fromMe) {
            await delay(1000)

            await wa.sendReadReceipt(message.key.remoteJid, message.key.participant, [message.key.id])
        }
    })
    */



    
    wa.ev.on('messages.upsert', async m => {
      const message = m.messages[0]
      if (!message.key.fromMe && message.key.remoteJid == '5511981568415@s.whatsapp.net')  {
        console.log('received message');
        
        let sendQueueMessage = {
          queue: "fila",
          message: {
              bot: sessionId,
              from: message.key.remoteJid,
              text: !message ? null : message.message.conversation 
            }
          }
      
        this.queueService.postInMessageQueue(sendQueueMessage).subscribe().closed;

        const response = await manager.process('pt', message.message.conversation);
        console.log(response, 'respostaaaa');
        
        if (response.intent == 'None') {
          await wa.sendMessage(message.key.remoteJid!, { text: "Desculpe, não consegui te entender... poderia dizer em outras palavras? :(" })
        } else 
          await wa.sendMessage(message.key.remoteJid!, { text: response.answer })

      // descomentar para resposta automatica do wf

      //let workResponse = await new ChatsServices(this.chatsRepository).onMessage(message, sessionId);
      //   if (workResponse) {
      //     console.log('replying to', message.key.remoteJid)
      //     await delay(2000)
      //     await wa.sendMessage(message.key.remoteJid!, { text: workResponse })

      //   }

      }
    })

    return await status(sessionId);
  }
}

const sessions = new Map()
const retries = new Map()

const sessionsDir = (sessionId = '') => {
  return join(__dirname, 'sessions', sessionId ? sessionId : '')
}

const isSessionExists = (sessionId) => {
  return sessions.has(sessionId)
}

const shouldReconnect = (sessionId) => {
  let maxRetries = parseInt('3')
  let attempts = retries.get(sessionId) ?? 0

  maxRetries = maxRetries < 1 ? 1 : maxRetries

  if (attempts < maxRetries) {
    ++attempts

    console.log('Reconnecting...', { attempts, sessionId })
    retries.set(sessionId, attempts)

    return true
  }

  return false
}

// const createSession = async (sessionId, isLegacy = false, res = null, chatsRepository) => {


//   const sessionFile = (isLegacy ? 'legacy_' : 'md_') + sessionId + (isLegacy ? '.json' : '')

//   const logger = pino({ level: 'warn' })
//   const store = makeInMemoryStore({ logger })

//   const { state, saveCreds } = await useMultiFileAuthState(sessionsDir(sessionFile))
//   let SocketConfig = {
//     auth: state,
//     printQRInTerminal: true
//   }

//   const wa = makeWASocket(SocketConfig);

//   sessions.set(sessionId, { ...wa, store, isLegacy })

//   wa.ev.on('creds.update', saveCreds);

//   wa.ev.on('connection.update', (update) => {
//     const { connection, lastDisconnect } = update

//     if (connection === 'close') {
//       const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut &&
//         (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.connectionReplaced;

//       // console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
//       // reconnect if not logged out
//       if (shouldReconnect) {
//         createSession(sessionId, false, null, chatsRepository)
//       }
//     } else if (connection === 'open') {
//       console.log('opened connection')
//     }

//     if (update.qr) {
//       console.log(update.qr, 'qr codestring');
//     }

//   })

//   // Automatically read incoming messages, uncomment below codes to enable this behaviour
//   /*
//   wa.ev.on('messages.upsert', async (m) => {
//       const message = m.messages[0]
//       if (!message.key.fromMe) {
//           await delay(1000)

//           await wa.sendReadReceipt(message.key.remoteJid, message.key.participant, [message.key.id])
//       }
//   })
//   */


//   wa.ev.on('messages.upsert', async m => {
//     const message = m.messages[0]
//     if (!message.key.fromMe && message.key.remoteJid == '5511981568415@s.whatsapp.net') {

//       let workResponse = await new ChatsServices(chatsRepository).onMessage(message, sessionId);

//       console.log('replying to', message.key.remoteJid)
//       await delay(2000)
//       await wa.sendMessage(message.key.remoteJid!, { text: workResponse })
//     }
//   })

//   await delay(2000)

//   return status(sessionId);
// }

/**
 * @returns {(import('@adiwajshing/baileys').AnyWASocket|null)}
 */
const getSession = (sessionId) => {
  return sessions.get(sessionId) ?? null
}

const deleteSession = (sessionId, isLegacy = false) => {
  const sessionFile = (isLegacy ? 'legacy_' : 'md_') + sessionId + (isLegacy ? '.json' : '')
  const storeFile = `${sessionId}_store.json`
  const rmOptions = { force: true, recursive: true }

  rmSync(sessionsDir(sessionFile), rmOptions)
  rmSync(sessionsDir(storeFile), rmOptions)

  sessions.delete(sessionId)
  retries.delete(sessionId)
}

const getChatList = (sessionId, isGroup = false) => {
  const filter = isGroup ? '@g.us' : '@s.whatsapp.net'

  return getSession(sessionId).store.chats.filter((chat) => {
    return chat.id.endsWith(filter)
  })
}

/**
 * @param {import('@adiwajshing/baileys').AnyWASocket} session
 */
const isExists = async (session, jid, isGroup = false) => {
  try {
    let result

    if (isGroup) {
      result = await session.groupMetadata(jid)

      return Boolean(result.id)
    }

    if (session.isLegacy) {
      result = await session.onWhatsApp(jid)
    } else {
      ;[result] = await session.onWhatsApp(jid)
    }

    return result.exists
  } catch {
    return false
  }
}

/**
 * @param {import('@adiwajshing/baileys').AnyWASocket} session
 */
const sendMessage = async (session, receiver, message, delayMs = 1000) => {
  try {
    await delay(delayMs)
    return session.sendMessage(receiver, message)
  } catch {
    return Promise.reject(null) // eslint-disable-line prefer-promise-reject-errors
  }
}

const formatPhone = (phone) => {
  let formatted = "";

  if (phone.startsWith('55') && phone.endsWith('@s.whatsapp.net')) {
    return phone
  }

  if (!phone.startsWith('55')) {
    formatted = '55';
  }

  if (!phone.endsWith('@s.whatsapp.net')) {

    formatted += phone.replace(/\D/g, '')
    formatted += '@s.whatsapp.net'
  }
  return formatted
}

const formatGroup = (group) => {
  if (group.endsWith('@g.us')) {
    return group
  }

  let formatted = group.replace(/[^\d-]/g, '')

  return (formatted += '@g.us')
}

const cleanup = () => {
  console.log('Running cleanup before exit.')

  sessions.forEach((session, sessionId) => {
    if (!session.isLegacy) {
      session.store.writeToFile(sessionsDir(`${sessionId}_store.json`))
    }
  })
}

// const init = () => {
//   readdir(sessionsDir(), (err, files) => {
//     if (err) {
//       throw err
//     }

//     for (const file of files) {
//       if ((!file.startsWith('md_') && !file.startsWith('legacy_')) || file.endsWith('_store')) {
//         continue
//       }

//       const filename = file.replace('.json', '')
//       const isLegacy = filename.split('_', 1)[0] !== 'md'
//       const sessionId = filename.substring(isLegacy ? 7 : 3)

//       // createSession(sessionId, isLegacy, null, null)
//     }
//   })
// }

const status = async (sessionId) => {
  const states = ['connecting', 'connected', 'disconnecting', 'disconnected']

  const session = await getSession(sessionId)

  if (!session)
    return { status: "disconnected" }

    
  let state = states[session.ws.readyState]

  state =
    state === 'connected' && typeof (session.isLegacy ? session.state.legacy.user : session.user) !== 'undefined'
      ? 'authenticated'
      : state
      
    if (session.store.state.connection == 'close' && state == 'connected') {
      return { status: session.store.state } ;
    }
    
  return { status: state };
}

export {
  status,
  isSessionExists,
  // this.createSession,
  getSession,
  deleteSession,
  getChatList,
  isExists,
  sendMessage,
  formatPhone,
  formatGroup,
  cleanup,
  // init,
}