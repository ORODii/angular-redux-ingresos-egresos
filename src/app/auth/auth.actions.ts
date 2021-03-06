import { Action } from '@ngrx/store';
import { User } from './user.model';

export const SET_USER = '[Auth] Guarda Usuario';
export const UNSET_USER = '[Auth] Vacia Usuario';

export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor(public user: User) {}
}

export class UnsetUserAction implements Action {
    readonly type = UNSET_USER;
}

export type acciones = SetUserAction | UnsetUserAction;