"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../entities/index");
const chats_entities_1 = require("../chats/chats.entities");
const typeorm_1 = require("typeorm");
class startup {
    async defaultData() {
        await (0, typeorm_1.getConnection)("default")
            .createQueryBuilder()
            .update(index_1.Bots)
            .set({ bot_status: "notLogged" })
            .execute();
        await (0, typeorm_1.getConnection)("default")
            .createQueryBuilder()
            .update(chats_entities_1.Chats)
            .set({ cha_stage: 0 })
            .execute();
    }
}
exports.default = startup;
//# sourceMappingURL=startup.js.map