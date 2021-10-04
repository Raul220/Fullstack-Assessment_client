import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { tagsReducer } from "../components/TagGenerator/Redux";

export const reducers = combineReducers({
    routing: routerReducer,
    tags: tagsReducer
});