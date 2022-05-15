import {Button, List, DatePicker, NavBar, Popup, Toast, Dialog} from 'antd-mobile'
import classNames from 'classnames'

import styles from './index.module.scss'
import {useDispatch} from "react-redux";
import { useState} from "react";
import {editUserInfo, updatePhoto, updateProfile} from "@/store/actions/profile";
import useInitState from "@/utils/useInitState";
import EditInput from "@/pages/Profile/Edit/components/EditInput";
import EditList from "@/pages/Profile/Edit/components/EditList";
import dayjs from "dayjs";
// import {clearToken} from "@/utils/token";
import {useHistory} from "react-router-dom";
import {fetchLogOut} from "@/store/actions/login";

const Item = List.Item

// 定义一个弹层的状态map
// 每个状态的相关信息统一维护起来
// 统一维护起来的好处：不用每次都在组件内部去写死一些内容
export const popMap = {
  name: {
    type: 'name',
    label: '昵称'
  },
  intro: {
    type: 'intro',
    label: '简介'
  }
}

const ProfileEdit = () => {
  //其他原生hook---------------------------
  const dispatch = useDispatch()
  const history = useHistory()

  // 自定义hook----------------------------
  const {profileInfo} = useInitState(editUserInfo, 'profile')
  // console.log(data)
  // const profileInfo = useSelector(state => state.profile.profileInfo)
  // console.log(res)
  // const [inputVisible, setInputVisible] = useState(false)

  // 重新定义维护状态的标识
  const [inputPop, serInputPop] = useState({
    type: '', // 弹层的类型
    value: '', // 弹层对应的数据
    visible: false // 弹层是否展示
  })

  const [listPopup, setListPopup] = useState({
    type: '',
    visible: false
  })

  const [showBirthday, setShowBirthday] = useState(false)

// 数据获取 ----------------------------
  const {
    intro,
    birthday,
    name,
    gender,
    photo
  } = profileInfo

  const shouEditInput = () => {
    // setInputVisible(true)
    serInputPop({
      type: popMap.name.type,  // 弹层类型用户提交数据时做区分
      value: name,  // 默认值数据，子组件进行默认展示
      visible: true // 展示弹层
    })
}

  const hiddenEditInput = () => {
    // setInputVisible(false)
    serInputPop({
      type: '',
      value: '',
      visible: false
    })
  }

  const updateName = async currentInfo => {
    // console.log(value)
    await dispatch(updateProfile(currentInfo))
    Toast.show({
      content: '更新成功',
      duration: 1000,
    });
    hiddenEditInput()
    hideGenderPop()
  }

  const showIntroInput = () => {
    serInputPop({
      type: popMap.intro.type,  // 弹层类型用户提交数据时做区分
      value: intro,  // 默认值数据，子组件进行默认展示
      visible: true // 展示弹层
    })
  }

  const showGenderPop = () => {
    setListPopup({
      type: 'gender',
      visible: true
    })
  }

  const hideGenderPop = () => {
    setListPopup({
      type: '',
      visible: false
    })
  }

  const showPhotoPop = () => {
    setListPopup({
      type: 'photo',
      visible: true
    })
  }

  const changePhoto = async (fd) => {
    // console.log(fd)
    await dispatch(updatePhoto(fd))
    Toast.show({
      content: '头像更新成功',
      duration: 1000
    })
    hideGenderPop()
  }

  const handleShowBirthday = () => {
    setShowBirthday(true)
  }

  const handleCloseShowBirthday = () => {
    setShowBirthday(false)
  }

  const updateBirthday = async (value) => {
    console.log(value)
    const birthday = dayjs(value).format('YYYY-MM-DD')
    console.log(birthday)
    await updateName({
      birthday,
    })
    setShowBirthday(false)
  }

  const handleLogOut = () => {
    Dialog.confirm({
      title: '温馨提示',
      content: '是否确认退出',
      onConfirm() {
        // console.log('点击了确认')
        dispatch(fetchLogOut())
        history.replace('/login')
        Toast.show({
          content: '退出成功',
          duration: 1000
        })
      }
    })
  }
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          style={{
            '--border-bottom': '1px solid #F0F0F0'
          }}
        >
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <Item
                onClick={showPhotoPop}
              extra={
                <span className="avatar-wrapper">
                  <img
                    width={100}
                    height={100}
                    src={photo}
                    alt=""
                  />
                </span>
              }
              arrow
            >
              头像
            </Item>
            <Item arrow extra={name} onClick={shouEditInput}>
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span  className={classNames('intro', 'normal')}>
                  {intro || '未填写'}
                </span>
              }
              onClick={showIntroInput}
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item onClick={showGenderPop} arrow extra={gender === '0' ? '男' : '女'}>
              性别
            </Item>
            <Item onClick={handleShowBirthday} arrow extra={birthday}>
              生日
            </Item>
          </List>

          <DatePicker
            visible={showBirthday}
            onCancel={handleCloseShowBirthday}
            value={new Date(birthday)}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
            onConfirm={updateBirthday}
          />
        </div>

        <div className="logout">
          <Button onClick={handleLogOut} className="btn">退出登录</Button>
        </div>
      </div>

      <Popup
          visible={inputPop.visible}
          position='right'
          destroyOnClose
      >
        <EditInput
            inputPop={inputPop}
            hiddenEditInput={hiddenEditInput}
            updateName={updateName}

        />
      </Popup>

      <Popup
          visible={listPopup.visible}
          position='bottom'
          onMaskClick={hideGenderPop}
      >
        <EditList changePhoto={changePhoto} type={listPopup.type} updateName={updateName} onClose={hideGenderPop}/>
      </Popup>
    </div>
  )
}

export default ProfileEdit
