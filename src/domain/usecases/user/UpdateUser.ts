import { User } from '../../entities';
import { UserRepository } from '../../repositories/UserRepository';

export class UpdateUser {

    constructor(private repo: UserRepository){}

    public async execute(userId: string, puser :Partial<{name:string, email:string, password:string}>):Promise<void>{
        
        const user :User|null = await this.repo.findById(userId);
        if(!user)
            throw new Error('User not found');

        const newUser :User = new User(
                user.id,
                puser.name || user.name,
                puser.email || user.email,
                puser.password || user.password,
                user.createdAt
        );

        await this.repo.update(newUser);
    }

}