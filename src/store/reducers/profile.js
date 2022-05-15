import {SETEDITACTION, SETPROFILEACTION, UPDATEUSERINFO} from "@/store/actionTypes";

const initState = {
    user: {},
    profileInfo: {}
}

export const profileReducer = (state=initState, action) => {
    switch (action.type) {
        case SETPROFILEACTION:
            return {
                ...state,
                user: action.payload
            }
        case SETEDITACTION:
            return {
                ...state,
                profileInfo: action.payload
            }
        case UPDATEUSERINFO:
            return {
                ...state,
                profileInfo: {
                    ...state,
                    ...action.payload
                }
            }
        default:
            return state
    }
}

