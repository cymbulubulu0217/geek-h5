import {Route, useHistory, useLocation} from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import styles from './index.module.scss';


import Icon from '@/components/Icon';


// 导入页面组件，配置路由
import Home from '../Home';
import Question from '../Question';
import Video from '../Video';
import Profile from '@/pages/Profile';
import AuthRoute from "@/components/AuthRoute";


const tabs = [
  { path: '/home/index', icon: 'iconbtn_home', text: '首页' },
  { path: '/home/question', icon: 'iconbtn_qa', text: '问答' },
  { path: '/home/video', icon: 'iconbtn_video', text: '视频' },
  { path: '/home/profile', icon: 'iconbtn_mine', text: '我的' },
];


const Layout = () => {
  const history = useHistory()
  const location = useLocation()

  const changeRoute = (path) => {
    // console.log(path)
      history.push(path)
  }
  return (
      <div className={styles.root}>
        <Route path={'/home/index'} exact>
          <Home/>
        </Route>
        <Route path={'/home/question'}>
          <Question/>
        </Route>
        <Route path={'/home/video'}>
          <Video/>
        </Route>
        <AuthRoute path={'/home/profile'}>
          <Profile/>
        </AuthRoute>

        <TabBar
            className="tab-bar"
            onChange={changeRoute}
            activeKey={location.pathname}
        >
          {tabs.map((item) => (
              <TabBar.Item
                  key={item.path}
                  title={item.text}
                  icon={(active) => {
                      return <Icon
                          type={active ? `${item.icon}_sel` : item.icon}
                          className="tab-bar-item-icon"
                      />
                  }}
              />
          ))}
        </TabBar>
      </div>
  );
};


export default Layout;
