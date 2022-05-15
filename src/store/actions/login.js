import http from "@/utils/http";
import {createAction} from "redux-actions";
import {LOGINACTION, LOGOUT} from "@/store/actionTypes";
import {clearToken, setToken} from "@/utils/token";

export const fetchLoginAction = createAction(LOGINACTION)

export const fetchLogin = (values) => {
    // console.log(values)
    return async dispatch => {
        const res = await http.post('/authorizations', values);
        // console.log(res)
        dispatch(fetchLoginAction(res.data))
        // 本次存储
        setToken(res.data)
    }
}


export const fetchCode = (mobile) => {
    return async () => {
        await http.get(`/sms/codes/${mobile}`);
    }
}


const logOutAction = createAction(LOGOUT)
export const fetchLogOut = () => {
    return dispatch => {
        //  清空redux里面的token
        //派发action对象去修改store，通过reducer
        dispatch(logOutAction())
        //  清空本地存储token
        clearToken()
    }
}
