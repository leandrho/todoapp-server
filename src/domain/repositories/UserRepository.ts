import { User } from '../entities/User';

export interface UserRepository {
    create(name: string, email: string, password: string):Promise<User | null>;
    findById(id: User["id"]):Promise<User | null>;
    findByEmail(email: string):Promise<User | null>;
    update(user: User): Promise<void>;
    delete(id: User["id"]): Promise<boolean>;
}
