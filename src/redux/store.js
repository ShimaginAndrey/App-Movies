import { createStore, applyMiddleware } from "redux";
import rootReducers from "./rootReducers";

const logger = (store) => (next) => (action) => {
    console.log('logger')
    next(action);
}

export const store = createStore(rootReducers, applyMiddleware(logger));
