import { Repository } from "typeorm";
import { Customers } from "../entities/index";
export declare class CustomersServices {
    private customersRepository;
    constructor(customersRepository: Repository<Customers>);
}
