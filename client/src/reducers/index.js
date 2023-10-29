import { combineReducers } from "redux";
import PostsReducer from "./posts"
import UsersReducer from "./users"

export default combineReducers({
    PostsReducer, UsersReducer
})