"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.cleanup = exports.formatGroup = exports.formatPhone = exports.sendMessage = exports.isExists = exports.getChatList = exports.deleteSession = exports.getSession = exports.createSession = exports.isSessionExists = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const pino_1 = require("pino");
const baileys_1 = require("@adiwajshing/baileys");
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
const createSession = async (sessionId, isLegacy = false, res = null) => {
    const sessionFile = (isLegacy ? 'legacy_' : 'md_') + sessionId + (isLegacy ? '.json' : '');
    const logger = (0, pino_1.default)({ level: 'warn' });
    const store = (0, baileys_1.makeInMemoryStore)({ logger });
    console.log(sessionId);
    const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)(sessionsDir(sessionFile));
    let SocketConfig = {
        auth: state,
        printQRInTerminal: true
    };
    const wa = (0, baileys_1.default)(SocketConfig);
    sessions.set(sessionId, Object.assign(Object.assign({}, wa), { store, isLegacy }));
    wa.ev.on('creds.update', saveCreds);
    wa.ev.on('connection.update', (update) => {
        var _a, _b;
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = ((_b = (_a = lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !== baileys_1.DisconnectReason.loggedOut;
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
            if (shouldReconnect) {
                createSession(sessionId);
            }
        }
        else if (connection === 'open') {
            console.log('opened connection');
        }
    });
    wa.ev.on('messages.upsert', async (m) => {
        const message = m.messages[0];
        if (!message.key.fromMe && message.key.remoteJid == '5511981568415@s.whatsapp.net') {
            console.log('replying to', message.key.remoteJid);
            await (0, baileys_1.delay)(2000);
            await wa.sendMessage(message.key.remoteJid, { text: 'auto resposta' });
        }
    });
};
exports.createSession = createSession;
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
    if (phone.endsWith('@s.whatsapp.net')) {
        return phone;
    }
    let formatted = phone.replace(/\D/g, '');
    return (formatted += '@s.whatsapp.net');
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
const init = () => {
    (0, fs_1.readdir)(sessionsDir(), (err, files) => {
        if (err) {
            throw err;
        }
        for (const file of files) {
            if ((!file.startsWith('md_') && !file.startsWith('legacy_')) || file.endsWith('_store')) {
                continue;
            }
            const filename = file.replace('.json', '');
            const isLegacy = filename.split('_', 1)[0] !== 'md';
            const sessionId = filename.substring(isLegacy ? 7 : 3);
            createSession(sessionId, isLegacy);
        }
    });
};
exports.init = init;
const status = (req, res) => {
    const states = ['connecting', 'connected', 'disconnecting', 'disconnected'];
    const session = getSession(res.locals.sessionId);
    let state = states[session.ws.readyState];
    state =
        state === 'connected' && typeof (session.isLegacy ? session.state.legacy.user : session.user) !== 'undefined'
            ? 'authenticated'
            : state;
    return { status: state };
};
//# sourceMappingURL=sessions.js.map