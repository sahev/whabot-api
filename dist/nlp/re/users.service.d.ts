import { Users } from '../entities/index';
import { Repository } from 'typeorm';
import { UsersDTO } from './usersDTO';
export declare class UsersService {
    private usersRepository;
    private readonly users;
    constructor(usersRepository: Repository<Users>);
    findAll(): Promise<Users[]>;
    create(data: UsersDTO): Promise<any>;
}
