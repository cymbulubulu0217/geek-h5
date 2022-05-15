import {combineReducers} from "redux";
import loginReducer from "@/store/reducers/login";
import {profileReducer} from "@/store/reducers/profile";
import {homeReducer} from "@/store/reducers/home";

// 合并reducer
// 操作：combineReducers
const rootReducer = combineReducers({
    login: loginReducer,
    profile: profileReducer,
    home: homeReducer
})

export default rootReducer
