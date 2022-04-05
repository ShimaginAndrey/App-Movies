import { LocalStorage } from "../utils/LocalStorage";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import rootReducers from "./rootReducers";
import {UPDATE_AUTH, LOGOUT} from "./auth/auth.constant";

const updateCookies = store => next => action => {
    if(action.type === UPDATE_AUTH) {
        LocalStorage.setItem('session_id', action.payload.session_id);
    }

    if(action.type === LOGOUT) {
        LocalStorage.remove('session_id');
    }
    
    return next(action);
}

export const store = createStore(rootReducers, applyMiddleware(thunk, updateCookies));
