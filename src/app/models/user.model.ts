import { Role } from "./role.model";

export interface User {
    id: string,
    email: string,
    roles: Role,
    banned: boolean
}