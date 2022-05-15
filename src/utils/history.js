import {createBrowserHistory} from "history";

// 为什么要单独的创建一个 history
// 因为 history 里面有 push 方法，方便跳转
const history = createBrowserHistory()

export default history
