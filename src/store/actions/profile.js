import http from "@/utils/http";
import {createAction} from "redux-actions";
import {SETEDITACTION, SETPROFILEACTION, UPDATEUSERINFO} from "@/store/actionTypes";


const setUserInfo = createAction(SETPROFILEACTION)

export const getUserInfo = () => {
    return async dispatch => {
        const res = await http.get('/user')
        // console.log(res)
        dispatch(setUserInfo(res.data))
    }
}


export const editUserInfo = () => {
    return async dispatch => {
        const res = await http.get('/user/profile')
        // console.log(res)
        dispatch({
            type: SETEDITACTION,
            payload: res.data
        })
    }
}


const setUpdateUserInfo = createAction(UPDATEUSERINFO)
export const updateProfile = (userProfile) => {
    return async dispatch => {
        await http.patch('/user/profile', userProfile);
        dispatch(setUpdateUserInfo(userProfile))
    }
}


export const updatePhoto = fd => {
    return async dispatch => {
       const res = await http.patch('/user/photo', fd);
        // console.log(res.data.photo)
        dispatch(setUpdateUserInfo({photo: res.data.photo}))
    }
}
