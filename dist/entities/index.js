"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignHistory = exports.Customers = exports.Chats = exports.Sessions = exports.Messages = exports.Bots = exports.Users = exports.Templates = void 0;
const users_1 = require("./models/users");
Object.defineProperty(exports, "Users", { enumerable: true, get: function () { return users_1.Users; } });
const bots_1 = require("./models/bots");
Object.defineProperty(exports, "Bots", { enumerable: true, get: function () { return bots_1.Bots; } });
const messages_1 = require("./models/messages");
Object.defineProperty(exports, "Messages", { enumerable: true, get: function () { return messages_1.Messages; } });
const sessions_1 = require("./models/sessions");
Object.defineProperty(exports, "Sessions", { enumerable: true, get: function () { return sessions_1.Sessions; } });
const chats_1 = require("./models/chats");
Object.defineProperty(exports, "Chats", { enumerable: true, get: function () { return chats_1.Chats; } });
const customers_1 = require("./models/customers");
Object.defineProperty(exports, "Customers", { enumerable: true, get: function () { return customers_1.Customers; } });
const campaignhistory_1 = require("./models/campaignhistory");
Object.defineProperty(exports, "CampaignHistory", { enumerable: true, get: function () { return campaignhistory_1.CampaignHistory; } });
const templates_1 = require("./models/templates");
Object.defineProperty(exports, "Templates", { enumerable: true, get: function () { return templates_1.Templates; } });
//# sourceMappingURL=index.js.map