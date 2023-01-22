import { Role } from "./role.model";

export class User {

    constructor(
        public roles: Role,
        public email: string,
        public id:string,
        private _token:string,
        private _tokenExpirationDate:Date,
        public boughtDishes: String[],
        public banned:boolean
        ) 
    {

    }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }        
        return this._token;
    }
}