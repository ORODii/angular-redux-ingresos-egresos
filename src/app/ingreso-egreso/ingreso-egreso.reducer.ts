import * as ingresoEgresoActions from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';

export interface State {
    items: IngresoEgreso[];
}

const initState: State = {
    items: []
}

export function ingresoEgresoReducer(state = initState, action: ingresoEgresoActions.acciones): State {
    switch (action.type) {
        case ingresoEgresoActions.SET_ITEMS:
            return {
                items: [
                    ... action.items.map(item => {
                        return { ... item }
                    })
                ]
            };
        case ingresoEgresoActions.UNSET_ITEMS:
            return {
                items: []
            };
        default:
            return state;
    }
}