import { User } from '../../domain/entities';
import { UserRepository } from '../../domain/repositories';
import { UserDatasource } from '../../domain/datasources';

export class UserRepositoryImpl implements UserRepository{
    
    private datasource: UserDatasource;
    
    constructor(userDatasource: UserDatasource){
        this.datasource = userDatasource;
    }

    public async create(name: string, email: string, password: string): Promise<User | null> {
        return await this.datasource.create(name, email, password);
    }
    public async findById(id: User['id']): Promise<User | null> {
        return await this.datasource.findById(id);
    }
    public async findByEmail(email: string): Promise<User | null> {
        return await this.datasource.findByEmail(email);
    }
    public async update(user: User): Promise<void> {
        return await this.datasource.update(user);
    }
    public async delete(id: User['id']): Promise<boolean> {
        return await this.datasource.delete(id);
    }
    
}