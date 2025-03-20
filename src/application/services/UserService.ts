
import { CreateUser, UpdateUser, DeleteUser } from "../../domain/usecases/user";
import { User } from "../../domain/entities";
import { CreateUserInputDto, CreateUserOutputDto } from '../dtos/user/CreateUserDto';
import { UpdateUserInputDto, UpdateUserOutputDto } from "../dtos/user/UpdateUserDto";

export class UserService{
   
    private createUserUC: CreateUser;
    private updateUserUC: UpdateUser;
    private deleteUserUC: DeleteUser;
    
    constructor( createUserUC: CreateUser, updateUserUC: UpdateUser, deleteUserUC: DeleteUser){
        this.createUserUC = createUserUC;
        this.updateUserUC = updateUserUC;
        this.deleteUserUC = deleteUserUC;
    }

    public async createUser(userInput: CreateUserInputDto):Promise<CreateUserOutputDto | null>{
        try {
            //! TODO: validate parameters
            const user: User | null = await this.createUserUC.execute(userInput.name, userInput.email, userInput.password);
            
            if(!user) throw new Error('Error creating user')

            return {id: user.id, name: user.name, email: user.email};
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async updateUser(userId: string, userInput: UpdateUserInputDto):Promise<UpdateUserOutputDto | null>{
        try{
            await this.updateUserUC.execute(userId, {...userInput} );
            return { id: userId, name: userInput.name, email: userInput.email }
        }
        catch(error){
            console.log(error);
            return null;
        }
        
    }    

    public async deleteUser(userId: string):Promise<boolean>{
        try{
            await this.deleteUserUC.execute(userId);
            return true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

}