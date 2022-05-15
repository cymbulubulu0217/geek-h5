import './App.scss';
import {Router, Redirect, Route, Switch} from "react-router-dom";
import Home from '@/pages/Layout'
import Login from '@/pages/Login'
import history from "@/utils/history";
import Edit from "@/pages/Profile/Edit";
import AuthRoute from "@/components/AuthRoute";
import Article from "@/pages/Article";

function App() {
    // 路由的 history 注入
    return <Router className="app" history={history}>
        <Switch>
            <Route path={'/'} exact render={() => <Redirect to={'/home'}/>}/>
            <Route path={'/home'} component={Home}/>
            <Route path={'/login'} component={Login}/>
            <AuthRoute path={'/profile/edit'}>
                <Edit/>
            </AuthRoute>
            <Route path={'/article/:art_id'} component={Article}/>
        </Switch>
    </Router>;
}

export default App;
