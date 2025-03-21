import { Request, Response } from 'express';
import { UserService } from '../../../application/services/UserService';
import { CreateUserInputDto, CreateUserOutputDto, UpdateUserInputDto, UpdateUserOutputDto } from '../../../application/dtos/user';

export class UserController {

    constructor(private userService: UserService){}

    public async createUser(req: Request, res: Response): Promise<Response>{
        try {
            console.log(req.body)
            const userInput: CreateUserInputDto = { name: req.body.name, email: req.body.email, password: req.body.password };
            const newUser: CreateUserOutputDto | null = await this.userService.createUser(userInput);
            if(!newUser){
                throw new Error("Datos de usuario inválidos whattt");
            }
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(400).json({ error: "Datos de usuario inválidos" });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<Response>{
        try {
            const userInDto: UpdateUserInputDto = {
                name: req.body.name, 
                email: req.body.email, 
                password: req.body.password
            };
            const userId: string = req.params.id;
            const updatedUser: UpdateUserOutputDto | null = await this.userService.updateUser(userId, userInDto);
            if(!updatedUser){
                return res.status(404).json({error: "Usuario no encontrado"} );
            }            

            return res.status(200).json(updatedUser);
          
        } catch (error) {
            return res.status(400).json({ error: "Datos de usuario inválidos" });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<Response>{
        try {

            const userId: string = req.params.id;
            const deleted: boolean = await this.userService.deleteUser(userId);

            if(!deleted){
                return res.status(404).json({error: "Usuario no encontrado"} );
            }
            
            return res.status(200).json({messege: "Usuario eliminado correctamente"});

        } catch (error) {
            return res.status(400).json({error: "Datos de usuario inválidos"});
        }
    }

}