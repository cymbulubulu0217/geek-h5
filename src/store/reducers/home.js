import {
    ADDCHANNEL,
    DELCHANNEL,
    SETRESTCHANNELS,
    UPDATEACTIVECHANNELKEY,
    UPDATEARTICLE,
    UPDATECHANNELS
} from "@/store/actionTypes";
import {sortBy} from "lodash";

const initState = {
    userChannel: [],  // 当前用户的频道数据
    restChannels: [], // 推荐频道数据
    activeChannelKey: '', // 当前选中的频道key
    channelArticles: {}
}

export const homeReducer = (state = initState, action) => {
    switch (action.type) {
        case UPDATECHANNELS:
            return {
                ...state,
                userChannel: action.payload,
                activeChannelKey: +action.payload[0]?.id,
            };
        case SETRESTCHANNELS:
            return {
                ...state,
                restChannels: action.payload
            };
        case UPDATEACTIVECHANNELKEY:
            return {
                ...state,
                activeChannelKey: action.payload
            };
        case DELCHANNEL:
            return {
                ...state,
                userChannel: state.userChannel.filter(item => item.id !== action.payload.id),
                restChannels: sortBy([
                    ...state.restChannels,
                    action.payload
                ],'id')
            };
        case ADDCHANNEL:
            return {
                ...state,
                userChannel: [
                    ...state.userChannel,
                    action.payload,
                ],
                restChannels: state.restChannels.filter(item => item.id !== action.payload.id)
            };
        case UPDATEARTICLE:
            const currentChannelArticle = state.channelArticles[action.payload.channel_id] || {
                pre_timestamp: null,
                results: []
            }
            const {channel_id, data: {pre_timestamp, results}} = action.payload
            return {
                ...state,
                channelArticles: {
                    ...state.channelArticles,
                    [channel_id]: {
                        pre_timestamp, // 替换成最新的时间戳
                        results: [
                            // 不能替换，不然原来的数据就没有了
                            ...currentChannelArticle.results,
                            ...results
                        ]
                    }

                }
            };
        default:
            return state
    }
}
