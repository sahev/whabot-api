import { UsersService } from "./users.service";
import { UsersDTO } from "./usersDTO";
export default class UserController {
    private userServices;
    constructor(userServices: UsersService);
    getAllUsers(): Promise<Users[]>;
    createUser(data: UsersDTO): Promise<any>;
}
