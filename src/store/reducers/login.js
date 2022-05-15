import {LOGINACTION, LOGOUT} from "@/store/actionTypes";


const initState = {
    token: '',  // 获取用户信息（调用有权限的接口时候）
    refresh_token: '' // 作用：用来获取token
}

// 登录的reducer
// 登录接口  接口获取到token后，调用login的reducer => token => store

// dispatch({type: 'add', payload: 1}) => 执行reducer
// return 一个全新的状态
const loginReducer = (state = initState, action) => {
    switch (action.type) {
        // 当我们匹配到 LOGINACTION 时，把 retuen 的值替换到仓库
        case LOGINACTION:
            return {
                ...action.payload
            }
        case LOGOUT:
            return initState
        default:
            return state
    }
}

export default loginReducer
