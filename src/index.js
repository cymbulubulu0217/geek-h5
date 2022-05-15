import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {Provider} from "react-redux";
import store from "@/store";

// 只要项目里面使用了redux 或者 dispatch，就需要用 react-redux 提供的 Provider 来进行包裹
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
