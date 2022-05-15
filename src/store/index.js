// 创建仓库文件

import {applyMiddleware, createStore} from "redux";
import rootReducer from "@/store/reducers";
import {composeWithDevTools} from "redux-devtools-extension";// 用做redux数据的浏览器可视化调节工具
import thunk from "redux-thunk";
import {getToken} from "@/utils/token";
// import {getToken} from "@/utils/token";  // 处理副作用的中间件

// 定义中间件
const middleWares = composeWithDevTools(applyMiddleware(thunk))

// 刷新界面的时候，把本地存储的token注入到redux里面去
const initialState = {
    login: getToken()
}

// 默认的初始值
const store = createStore(rootReducer, initialState, middleWares)

// 把store和react用 react-redux 关联起来
export default store
