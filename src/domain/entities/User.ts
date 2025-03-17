
export class User {
    
    constructor( 
        public readonly id: string, 
        public name: string, 
        public email: string, 
        public password: string, //! TODO - PRIVATE PASSWORD
        public readonly createdAt: Date = new Date() 
    ){ }

    public validatePasssword( password: string): boolean{
        return this.password === password;
    }
}
