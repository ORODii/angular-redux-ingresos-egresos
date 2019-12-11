import * as uiActions from './ui.actions';

export interface State {
    isLoading: boolean;
}

const initState: State = {
    isLoading: false
}

export function uiReducer(state: State = initState, action: uiActions.acciones): State {
    switch (action.type) {
        case uiActions.ACTIVAR_LOADING:
            return {
                isLoading: true
            };

        case uiActions.DESACTIVAR_LOADING:
            return {
                isLoading: false
            };

        default:
            return state;
    }
}