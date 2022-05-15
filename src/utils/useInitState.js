import {useMount} from "@/utils/useMount";
import {useDispatch, useSelector} from "react-redux";

function useInitState (action, key) {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state[key])
    useMount(() => {
        dispatch(action())
    })
    return userInfo
}
export default useInitState
