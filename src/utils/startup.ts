import { Bots } from "../entities/index";
import { Chats } from "../chats/chats.entities"
import { getConnection } from "typeorm";

class startup {
    
  public async defaultData() {
    await getConnection("default")
    .createQueryBuilder()
    .update(Bots)
    .set({ bot_status: "notLogged" })
    .execute()

    await getConnection("default")
    .createQueryBuilder()
    .update(Chats)
    .set({ cha_stage: 0 })
    .execute()
  }

}


export default startup