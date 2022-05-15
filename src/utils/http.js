// 封装axios
// 封装 axios
import axios from 'axios';
import store from '@/store';
import {Toast} from 'antd-mobile';
import history from './history';
import {clearToken, setToken} from "@/utils/token";
import {fetchLoginAction, fetchLogOut} from "@/store/actions/login";
// import { logout } from '@/store/actions'

const baseURL = 'http://toutiao.itheima.net/v1_0'
const http = axios.create({
    baseURL,
    timeout: 5000,
});

// 请求响应拦截器
http.interceptors.request.use(config => {
    // 请求时候的配置项
    // 做什么事情？
    // 注入token的时候判断：当前的接口是否需要权限
    // 登录接口可以不需要注入token
    // 判断当前接口是否是登录接口
    // 如果不是登录接口，再进行token注入
    // config.url是请求地址
    // authorizations 是登录接口的地址
    // redux仓库里面
    const {login: {token = ''}} = store.getState()
    if (!config.url?.startsWith('/authorizations') && token) {
        // 什么样的场景走这里？
        // 登录的接口需要token吗
        // token从store里面进行获取的
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, err => {
    console.log(err)
    return Promise.reject(err)
})

// 响应拦截器
// 做什么事情？
http.interceptors.response.use(response => response.data, async err => {
    // 判断是否返回数据了？
    // error.response // 服务器响应回来的数据
    if (!err.response) {
        //  直接进行提示
        Toast.show({
            content: '网络繁忙，请稍后重试',
            duration: 1000,
        })
        return Promise.reject(err)
    }

    if (err.response.status === 401) {
        // 先判断 redux 中是否有 refresh_token
        try {
            const {refresh_token} = store.getState().login
            if (refresh_token) {
                const res = await axios.put(`${baseURL}/authorizations`, null, {
                    headers: {
                        Authorization: `Bearer ${refresh_token}`
                    }
                })
                const tokens = {
                    token: res.data.data.token, // token数据替换为最新获取到的token
                    refresh_token // 复用之前的refresh_token
                }

                // 获取到的最新数据保存到本地存储和redux里面，方便下一次请求的时候获取最新的token
                setToken(tokens)
                store.dispatch(fetchLoginAction(tokens))
                return http(err.config)
            }
            await Promise.reject('失效了')
        } catch (e) {
            // 清空redux数据
            store.dispatch(fetchLogOut())
            // 清空本地存储数据
            clearToken()
            // 弹层提示，跳转登录界面
            Toast.show({
                content: '登录失效，请重新登录',
                duration: 1000,
                //   跳转登录页面,
                afterClose: () => {
                    //  弹层关闭之后执行的逻辑
                    history.push('/login')
                }
            })
        }
    }
    return Promise.reject(err)
})

// 默认导出
export default http


// async function get() {
//   try {
//     await axios.get('')
//     await axios.get('234234')
//   } catch () {
//
//   }
// }


