export const updateAuthAction = (payload) => {
    return {
        type: "UPDATE_AUTH",
        payload
    }
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