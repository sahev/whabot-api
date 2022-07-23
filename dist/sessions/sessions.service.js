"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanup = exports.formatGroup = exports.formatPhone = exports.sendMessage = exports.isExists = exports.getChatList = exports.deleteSession = exports.getSession = exports.isSessionExists = exports.status = exports.SessionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const venom_bot_1 = require("venom-bot");
const entities_1 = require("../entities");
const chats_entities_1 = require("../chats/chats.entities");
const BrowserData_1 = require("./BrowserData");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const stages_entities_1 = require("../flows/stages/stages.entities");
const fs_1 = require("fs");
const path_1 = require("path");
const pino_1 = require("pino");
const baileys_1 = require("@adiwajshing/baileys");
const queue_service_1 = require("../messagequeue/queue.service");
const documents_entities_1 = require("../nlp/documents/documents.entities");
const documents_service_1 = require("../nlp/documents/documents.service");
const node_nlp_1 = require("node-nlp");
const responses_service_1 = require("../nlp/responses/responses.service");
let SessionsService = class SessionsService {
    constructor(botsRepository, messagesRepository, chatsRepository, staRepository, documentsRepository, queueService, documentsService, responsesService) {
        this.botsRepository = botsRepository;
        this.messagesRepository = messagesRepository;
        this.chatsRepository = chatsRepository;
        this.staRepository = staRepository;
        this.documentsRepository = documentsRepository;
        this.queueService = queueService;
        this.documentsService = documentsService;
        this.responsesService = responsesService;
    }
    async getSessionTokenBrowser(data) {
        return new venom_bot_1.Whatsapp(data).getSessionTokenBrowser();
    }
    async logout(clientId) {
        deleteSession(parseInt(clientId));
        console.log('logout id', clientId);
        this.setBotStatus(parseInt(clientId), { bot_status: "notLogged", bot_lastStatus: "notLogged" });
        this.queueService.closeConnection().subscribe().closed;
    }
    getClient(data, clientName) {
        let resp = [];
        data.map((res) => {
            if (res.session === clientName)
                resp = res;
        });
        return resp;
    }
    async getBot(botId) {
        return await this.botsRepository.findOne({ bot_bot: botId });
    }
    async setBotStatus(botId, data) {
        const obj = { bot_bot: botId, bot_status: data.bot_status, bot_lastStatus: data.bot_lastStatus };
        await this.botsRepository.update({ bot_bot: botId }, data);
        this.onUpdatedBots(obj);
    }
    onUpdatedBots(data) {
        this.server.emit("onUpdatedBots", data);
    }
    qrCodeStringUpdate(data) {
        this.server.emit("qrCodeStringUpdate", data);
    }
    async startBot(botId) {
        var res = await this.createSession(botId);
        var data = {
            bot_bot: botId,
            bot_status: res.status,
            bot_lastStatus: res.status
        };
        this.setBotStatus(botId, data);
        return res;
    }
    start(client, botId) {
        console.log('starting bot');
        new BrowserData_1.BrowserData(client);
    }
    async getBotStatus(botId) {
        return await status(botId);
    }
    async createSession(sessionId, isLegacy = false, res = null) {
        const manager = new node_nlp_1.NlpManager({ languages: ['pt'], forceNER: true });
        let statusBot = await status(sessionId);
        if (statusBot.status == 'authenticated')
            return statusBot;
        const sessionFile = (isLegacy ? 'legacy_' : 'md_') + sessionId + (isLegacy ? '.json' : '');
        const logger = (0, pino_1.default)({ level: 'silent' });
        const store = (0, baileys_1.makeInMemoryStore)({ logger });
        const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)(sessionsDir(sessionFile));
        let SocketConfig = {
            auth: state,
            printQRInTerminal: false
        };
        const wa = (0, baileys_1.default)(SocketConfig);
        sessions.set(sessionId, Object.assign(Object.assign({}, wa), { store, isLegacy }));
        wa.ev.on('creds.update', saveCreds);
        wa.ev.on('connection.update', async (update) => {
            var _a, _b, _c, _d;
            const { connection, lastDisconnect } = update;
            if (connection === 'close') {
                const shouldReconnect = ((_b = (_a = lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !== baileys_1.DisconnectReason.loggedOut &&
                    ((_d = (_c = lastDisconnect.error) === null || _c === void 0 ? void 0 : _c.output) === null || _d === void 0 ? void 0 : _d.statusCode) !== baileys_1.DisconnectReason.connectionReplaced;
                if (shouldReconnect) {
                    this.createSession(sessionId, false, null);
                }
            }
            else if (connection === 'open') {
                console.log('opened connection');
                var data = {
                    bot_bot: sessionId,
                    bot_status: "authenticated",
                    bot_lastStatus: "authenticated"
                };
                this.setBotStatus(sessionId, data);
                this.queueService.connectMessageQueue().subscribe().closed;
                let documents = await this.documentsService.findAllByBot(sessionId);
                documents.map(document => {
                    manager.addDocument(document.doc_language, document.doc_text, document.doc_intent);
                });
                let responses = await this.responsesService.findAllByBot(sessionId);
                responses.map(response => {
                    manager.addAnswer(response.res_language, response.res_intent, response.res_text);
                });
                await manager.train();
                manager.save();
            }
            if (update.qr) {
                this.qrCodeStringUpdate(update.qr);
            }
        });
        wa.ev.on('messages.upsert', async (m) => {
            const message = m.messages[0];
            if (!message.key.fromMe && message.key.remoteJid == '5511981568415@s.whatsapp.net') {
                console.log('received message');
                let sendQueueMessage = {
                    queue: "fila",
                    message: {
                        bot: sessionId,
                        from: message.key.remoteJid,
                        text: !message ? null : message.message.conversation
                    }
                };
                this.queueService.postInMessageQueue(sendQueueMessage).subscribe().closed;
                const response = await manager.process('pt', message.message.conversation);
                console.log(response, 'respostaaaa');
                if (response.intent == 'None') {
                    await wa.sendMessage(message.key.remoteJid, { text: "Desculpe, não consegui te entender... poderia dizer em outras palavras? :(" });
                }
                else
                    await wa.sendMessage(message.key.remoteJid, { text: response.answer });
            }
        });
        return await status(sessionId);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SessionsService.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("onUpdatedBots"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SessionsService.prototype, "onUpdatedBots", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("qrCodeStringUpdate"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SessionsService.prototype, "qrCodeStringUpdate", null);
SessionsService = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Bots)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Messages)),
    __param(2, (0, typeorm_1.InjectRepository)(chats_entities_1.Chats)),
    __param(3, (0, typeorm_1.InjectRepository)(stages_entities_1.Stages)),
    __param(4, (0, typeorm_1.InjectRepository)(documents_entities_1.Documents)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        queue_service_1.QueueService,
        documents_service_1.DocumentsService,
        responses_service_1.ResponsesService])
], SessionsService);
exports.SessionsService = SessionsService;
const sessions = new Map();
const retries = new Map();
const sessionsDir = (sessionId = '') => {
    return (0, path_1.join)(__dirname, 'sessions', sessionId ? sessionId : '');
};
const isSessionExists = (sessionId) => {
    return sessions.has(sessionId);
};
exports.isSessionExists = isSessionExists;
const shouldReconnect = (sessionId) => {
    var _a;
    let maxRetries = parseInt('3');
    let attempts = (_a = retries.get(sessionId)) !== null && _a !== void 0 ? _a : 0;
    maxRetries = maxRetries < 1 ? 1 : maxRetries;
    if (attempts < maxRetries) {
        ++attempts;
        console.log('Reconnecting...', { attempts, sessionId });
        retries.set(sessionId, attempts);
        return true;
    }
    return false;
};
const getSession = (sessionId) => {
    var _a;
    return (_a = sessions.get(sessionId)) !== null && _a !== void 0 ? _a : null;
};
exports.getSession = getSession;
const deleteSession = (sessionId, isLegacy = false) => {
    const sessionFile = (isLegacy ? 'legacy_' : 'md_') + sessionId + (isLegacy ? '.json' : '');
    const storeFile = `${sessionId}_store.json`;
    const rmOptions = { force: true, recursive: true };
    (0, fs_1.rmSync)(sessionsDir(sessionFile), rmOptions);
    (0, fs_1.rmSync)(sessionsDir(storeFile), rmOptions);
    sessions.delete(sessionId);
    retries.delete(sessionId);
};
exports.deleteSession = deleteSession;
const getChatList = (sessionId, isGroup = false) => {
    const filter = isGroup ? '@g.us' : '@s.whatsapp.net';
    return getSession(sessionId).store.chats.filter((chat) => {
        return chat.id.endsWith(filter);
    });
};
exports.getChatList = getChatList;
const isExists = async (session, jid, isGroup = false) => {
    try {
        let result;
        if (isGroup) {
            result = await session.groupMetadata(jid);
            return Boolean(result.id);
        }
        if (session.isLegacy) {
            result = await session.onWhatsApp(jid);
        }
        else {
            ;
            [result] = await session.onWhatsApp(jid);
        }
        return result.exists;
    }
    catch (_a) {
        return false;
    }
};
exports.isExists = isExists;
const sendMessage = async (session, receiver, message, delayMs = 1000) => {
    try {
        await (0, baileys_1.delay)(delayMs);
        return session.sendMessage(receiver, message);
    }
    catch (_a) {
        return Promise.reject(null);
    }
};
exports.sendMessage = sendMessage;
const formatPhone = (phone) => {
    let formatted = "";
    if (phone.startsWith('55') && phone.endsWith('@s.whatsapp.net')) {
        return phone;
    }
    if (!phone.startsWith('55')) {
        formatted = '55';
    }
    if (!phone.endsWith('@s.whatsapp.net')) {
        formatted += phone.replace(/\D/g, '');
        formatted += '@s.whatsapp.net';
    }
    return formatted;
};
exports.formatPhone = formatPhone;
const formatGroup = (group) => {
    if (group.endsWith('@g.us')) {
        return group;
    }
    let formatted = group.replace(/[^\d-]/g, '');
    return (formatted += '@g.us');
};
exports.formatGroup = formatGroup;
const cleanup = () => {
    console.log('Running cleanup before exit.');
    sessions.forEach((session, sessionId) => {
        if (!session.isLegacy) {
            session.store.writeToFile(sessionsDir(`${sessionId}_store.json`));
        }
    });
};
exports.cleanup = cleanup;
const status = async (sessionId) => {
    const states = ['connecting', 'connected', 'disconnecting', 'disconnected'];
    const session = await getSession(sessionId);
    if (!session)
        return { status: "disconnected" };
    let state = states[session.ws.readyState];
    state =
        state === 'connected' && typeof (session.isLegacy ? session.state.legacy.user : session.user) !== 'undefined'
            ? 'authenticated'
            : state;
    if (session.store.state.connection == 'close' && state == 'connected') {
        return { status: session.store.state };
    }
    return { status: state };
};
exports.status = status;
//# sourceMappingURL=sessions.service.js.map