import { LocalStorage } from "../../utils/LocalStorage";
import {UPDATE_AUTH, LOGOUT} from "../auth/auth.constant";

export const updateLocalStorage = store => next => action => {
    if(action.type === UPDATE_AUTH) {
        LocalStorage.setItem('session_id', action.payload.session_id);
    }

    if(action.type === LOGOUT) {
        LocalStorage.remove('session_id');
    }
    
    return next(action);
}