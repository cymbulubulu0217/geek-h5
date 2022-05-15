import {Redirect, Route, useLocation} from "react-router-dom";
import {isAuth} from "@/utils/token";
import {useDispatch} from "react-redux";
import {fetchLogOut} from "@/store/actions/login";

const AuthRoute = ({children, ...rest}) => {
    const dispatch = useDispatch()
    const location = useLocation()
    // console.log(location)
    return (
        <Route
            {...rest}
            render={() => {
                const isLogin = isAuth()
                // console.log(isLogin)
                if (isLogin) {
                    console.log('1')
                    return children
                }
                // 跳转了登录界面，
                // 登录成功之后还想要返回我自己访问的界面
                // console.log('2')
                dispatch(fetchLogOut())
                // console.log('3')
                return <Redirect to={{
                    pathname: '/login/edit',
                    state: {
                        from: location.pathname
                    }
                }}/>
            }}
        >

        </Route>
    );
};

export default AuthRoute;

//1、token不能长期有效
//2、客户端最找的体验就是能够一直保持登录状态，除非长期不使用

// 2小时
