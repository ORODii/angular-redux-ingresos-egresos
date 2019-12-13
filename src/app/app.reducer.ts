import { ActionReducerMap } from '@ngrx/store';

import * as uiReducer from './shared/ui.reducer';
import * as authReducer from './auth/auth.reducer';
// import * as ingresoEgresoReducer from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
    ui: uiReducer.State;
    auth: authReducer.State;
    // ingresoEgreso: ingresoEgresoReducer.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: uiReducer.uiReducer,
    auth: authReducer.authReducer,
    // ingresoEgreso: ingresoEgresoReducer.ingresoEgresoReducer
}
