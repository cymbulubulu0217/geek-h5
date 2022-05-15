// 定义一个获取频道数据的thunk函数
import {CHANNEL_LOCAL_KEY} from "@/store/constants";
import http from "@/utils/http";
import {createAction} from "redux-actions";
import {
    ADDCHANNEL,
    DELCHANNEL,
    SETRESTCHANNELS,
    UPDATEACTIVECHANNELKEY,
    UPDATEARTICLE,
    UPDATECHANNELS
} from "@/store/actionTypes";
import {differenceBy} from 'lodash'
// import channels from "@/pages/Home/components/Channels";

// 创建 action 对象的方法
const updateUserChannels = createAction(UPDATECHANNELS)
const setRestChannels = createAction(SETRESTCHANNELS)
export const updateActionChannelKey = createAction(UPDATEACTIVECHANNELKEY)
const delChannelsAction = createAction(DELCHANNEL)
const addChannelsAction = createAction(ADDCHANNEL)
const addArticle = createAction(UPDATEARTICLE)

export const getUserChannel = () => {
    return async (dispatch, getState) => {
        //  判断用户是否登录
        const {login: {token}} = getState()
        // console.log(token)
        // 判断一下本地存储是否有数据
        let useChannels = []
        // 判断本地存储是否由数据
        const loaclChannels = JSON.parse(localStorage.getItem(CHANNEL_LOCAL_KEY) || '[]')

        // 判断需要请求接口的用户状态
        if(token || !loaclChannels) {
            // 登录了或本地存储没数据
            // console.log('调用了接口')
            const {data: {channels}} = await http.get('/user/channels')
            // console.log(channels)
            localStorage.setItem(CHANNEL_LOCAL_KEY,JSON.stringify(channels))
            useChannels = channels
            // console.log(useChannels)
        } else {
            // 没登录但本地存储有数据
            console.log('使用了本地的存储数据')
            useChannels = loaclChannels
            JSON.parse(localStorage.getItem(CHANNEL_LOCAL_KEY))
        }

        // 写入到redux
        dispatch(updateUserChannels(useChannels))
    }
}

export const getRestChannel = () => {
    return async (dispatch, getState) => {
        const {home: {userChannel}} = getState()
        // console.log(userChannel)

        const res = await http("/channels")
        // console.log(res.data.channels)

        const restChannels = differenceBy(res.data.channels, userChannel, 'id')
        // console.log(restChannels)

        dispatch(setRestChannels((restChannels)))
    }
}

export const delChannel = (item) => {
    return async (dispatch, getState) => {
        const {login: {token}} = getState()
        console.log(token)
        if(token) {
            await http.delete(`/user/channels/${item.id}`)
        } else {
            const localChannels = JSON.parse(localStorage.getItem(CHANNEL_LOCAL_KEY || '[]'))
            const userChannels = localChannels.filter(channel => item.id !== channel.id)
            localStorage.setItem(CHANNEL_LOCAL_KEY,JSON.stringify(userChannels))
        }
        dispatch(delChannelsAction(item))
    }
}

export const handleAddChannel = (item) => {
    return async (dispatch, getState) => {
        const {login: {token}} = getState()
        // console.log(token)
        if(token) {
            // 接口存储
            await http.patch(`/user/channels`, {channels: [item]})
        } else {
            // 本地存储
            const localChannels = JSON.parse(localStorage.getItem(CHANNEL_LOCAL_KEY || '[]'))
            const userChannels = {...localChannels, item}
            localStorage.setItem(CHANNEL_LOCAL_KEY, JSON.stringify(userChannels))
        }
        dispatch(addChannelsAction(item))

    }
}

export const getArticleList = (channel_id, timestamp) => {
    return async dispatch => {
        const res = await http.get('/articles',{
            params: {
                channel_id,
                timestamp,
            }
        })
        // console.log(res)
        dispatch(addArticle({
            channel_id,
            data: res.data
        }))
    }
}
