import classnames from 'classnames'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {delChannel, getRestChannel, handleAddChannel, updateActionChannelKey} from "@/store/actions/home";

const Channels = ({onClose}) => {
  const [isEdit, setIsEdit] = useState(false)
  const changeEditState = () => {
    setIsEdit(!isEdit)
  }

  const {userChannel, restChannels, activeChannelKey} = useSelector(state => state.home)
  // const {restChannels = []} = useSelector(state => state.home)
  // console.log(restChannels)
  // console.log(userChannel)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRestChannel())
  },[])

  const changeActiveChannelKey = (item) => () => {
    if(!isEdit) {
      dispatch(updateActionChannelKey(item.id))
      onClose()
      return
    }
    // 处于编辑状态
    if(item.id === 0) return;
    if(userChannel.length <= 4) return;
    dispatch(delChannel(item))
  }

  const addChannel = (item) => () => {
    dispatch(handleAddChannel(item))
  }


  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose}/>
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames('channel-item', isEdit && 'edit')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击进入频道</span>
            <span className="channel-item-edit" onClick={changeEditState}>
              {isEdit ? '保存' : '编辑'}
            </span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {
              userChannel.map(item => (
                  <span
                      onClick={changeActiveChannelKey(item)}
                      key={item.id}
                      className={classnames(
                          'channel-list-item',
                          +activeChannelKey === +item.id && 'selected'
                      )}
                  >
                      {item.name}
                  <Icon type="iconbtn_tag_close" />
                  </span>
              ))
            }
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span

                className="channel-item-title-extra"
            >点击添加频道</span>
          </div>
          <div className="channel-list">
            {/*<span className="channel-list-item">+ HTML</span>*/}
            {
              restChannels.map(item => (
                  <span onClick={addChannel(item)} key={item.id} className="channel-list-item">+ {item.name}</span>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
