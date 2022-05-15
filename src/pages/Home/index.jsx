import Icon from '@/components/Icon'
import styles from './index.module.scss'
import {Popup, Tabs} from "antd-mobile";
// import {useDispatch} from "react-redux";
// import {useMount} from "ahooks";
import {getUserChannel, updateActionChannelKey} from "@/store/actions/home";
import useInitState from "@/utils/useInitState";
import Channels from "@/pages/Home/components/Channels";
import {useState} from "react";
import {useDispatch} from "react-redux";
import ArticleList from "@/pages/Home/components/ArticleList";

const {Tab} = Tabs
const Home = () => {
    // const dispatch = useDispatch()
    // useMount(() => {
    //     dispatch(getUserChannel())
    // })
    const dispatch = useDispatch()
    const {userChannel = [], activeChannelKey} = useInitState(getUserChannel,'home')
    // console.log(userChannel)
    let [visible, setVisible] = useState(false)

    const onChannelChange = () => {
        setVisible(!visible)
    }
    const onTabChange = (key) => {
        dispatch(updateActionChannelKey(key))
    }
  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
        {
            userChannel.length > 0 && (
                <Tabs
                    activeKey={activeChannelKey + ''}
                    className="tabs"
                    activeLineMode="fixed"
                    onChange={onTabChange}
                >
            {
                 userChannel.map(item => (
                    <Tab title={item.name} key={item.id}>
                        {/*<ArticleList channelId={item.id}/>*/}
                    </Tab>)
                )
            }
                </Tabs>
            )
        }

      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon type="iconbtn_channel" onClick={onChannelChange}/>
      </div>
        <Popup
            visible={visible}
            position={"left"}
            className="channel-popup"
        >
            <Channels onClose={onChannelChange}/>
        </Popup>
    </div>
  )
}

export default Home
