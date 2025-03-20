import { User } from "../../entities";
import { UserRepository } from "../../repositories/UserRepository";

export class CreateUser {
    
    constructor(private repo: UserRepository){}

    public async execute(name: string, email: string, password: string): Promise<User | null>{
        const userExist: User | null = await this.repo.findByEmail(email);
        if(userExist){
            console.log('USUARIO EXISTE')
            throw new Error("User already exists");
        }
        //! TODO: hashpass
        const user = await this.repo.create(name, email, password);
        return user;
    }
    

}