import * as authActions from './auth.actions';
import { User } from './user.model';

export interface State {
    user: User
}

const initState: State = {
    user: null
}

export function authReducer(state: State = initState, action: authActions.acciones): State {
    switch (action.type) {
        case authActions.SET_USER:
            return {
                user: { ... action.user }
            };
        case authActions.UNSET_USER:
            return {
                user: null
            };
        default:
            return state;
    }
}