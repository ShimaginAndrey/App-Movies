import { RequestApi } from "../../api/api";

export const getAuthAction = session_id => dispatch => {
    RequestApi.get('/account', {
        params: {session_id}
    })
    .then(user =>  dispatch(updateAuthAction({user, session_id})))
    .catch(error => console.error(error))
};

export const updateAuthAction = ({user, session_id}) => {
   return {
        type: "UPDATE_AUTH",
        payload: {
            user,
            session_id
        }
    };
};

export const toLogOutAction = () => {
    return {
        type: "LOGOUT"
    }
};

export const toggleLoginModalAction = () => {
    return {
      type: "TOGGLE_LOGIN_MODAL"
    };
};