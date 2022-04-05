import { LocalStorage } from "../../utils/LocalStorage";
import * as types from '../auth/auth.constant';

const initialSate = {
    user: null,
    session_id: LocalStorage.getItem('session_id'),
    showLoginModal: false,
}

export const authReducer = (state = initialSate, action) => {
    switch(action.type) {
        case types.UPDATE_AUTH:
            LocalStorage.setItem('session_id', action.payload.session_id);
            return {
                ...state,
                user: action.payload.user,
                session_id: action.payload.session_id
            }
        case types.LOGOUT: 
            LocalStorage.remove('session_id');
            return {
                ...state,
                user: null,
                session_id: null
            }

        case types.TOGGLE_LOGIN_MODAL:
            return {
                ...state,
                showLoginModal: !state.showLoginModal
            }
            
        default:
            return state;
    }
}