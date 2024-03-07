export interface Payload {
    id: User["id"];
    email: User["email"];
}

declare global {
    namespace Express {
        interface User extends Payload {}
    }
}

export interface CreatableUser {
    name: string;
    email: string;
    password?: string;
}

export interface User extends CreatableUser {
    id: number;
}

export interface CreateableItem {
    user_id: User["id"];
    content: string;
}

export interface Item extends CreateableItem {
    id: number;
    is_complete: boolean;
    created_at: string | Date;
    updated_at: string | Date;
}
