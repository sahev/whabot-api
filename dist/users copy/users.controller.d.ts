import { UsersService } from "./users.service";
import { UsersDTO } from "./usersDTO";
import { Users } from "../entities";
export default class UserController {
    private userServices;
    constructor(userServices: UsersService);
    getAllUsers(): Promise<Users[]>;
    createUser(data: UsersDTO): Promise<Users | import("@nestjs/common").BadRequestException>;
}
