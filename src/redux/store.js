import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./rootReducers";
import {updateLocalStorage} from "./middlewares/updateLocalStorage";


export const store = createStore(rootReducers, applyMiddleware(thunk, updateLocalStorage));
