import {Button, Form, Input, NavBar, Toast} from "antd-mobile";
import style from "@/pages/Login/index.module.scss";
import {useDispatch} from "react-redux";
import {fetchCode, fetchLogin} from "@/store/actions/login";
import {useEffect, useRef, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";

const {useForm} = Form

const Login = (props) => {
    const [timeLeft, setTimeLift] = useState(0)

    const mobileRef = useRef(null)
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    // console.log(props)

    const [form] = useForm()

    // 登录按钮
    const onFinish = async (values) => {
        // console.log(values)
        try {
            // 调用登录接口
            await dispatch(fetchLogin(values))
            // 登录后的提示
            Toast.show({
                content: '登录成功',
                duration: 1000,
            })
            // 先看用户再跳转过来的时候是否携带了state这个值，如果携带了， state。form 去进行路径的跳转
            const fromPath =location?.state?.from
            // console.log(fromPath)
            history.replace(fromPath || '/home/index')
        } catch (e) {
            Toast.show({
                content: e?.response?.data?.message || '登录失败，请重新再试',
                duration: 1000
            })
        }
    }
    // 登录逻辑
    // 登录接口的时候把返回的token存储起来
    // 1、redux=》项目里面获取的时候用
    // 2、本地存储=》持久化
    // 3、接口请求redux action dispatch
    // 4、thunk完成登录的副作用
    // 5、请求登录接口，获取到的内容派发真正的reducer，更新store

    useEffect(() => {
        const newTime = setTimeout(() => {
            if(timeLeft > 0) {
                setTimeLift(c => c - 1)
            }
        },1000)
        return () => {
            clearTimeout(newTime)
        }
    },[timeLeft])

    const getCode = () => {
        const mobile = form.getFieldValue('mobile') || ''
        const hasError = form.getFieldError('mobile').length > 0
        if(mobile.trim() === '' || hasError) {
            // 如果校验出错，input框自动获取焦点
            mobileRef.current.focus()
            return
        }
        setTimeLift(6)
        dispatch(fetchCode(mobile))
    }

    return (
        <div className={style.root}>
            <NavBar/>
            <div className={'login-form'}>
                <h2 className={style.title}>短信登录</h2>

                {/*表单区域*/}
                <Form
                    onFinish={onFinish}
                    validateTrigger={['onBlur', 'onChange']} // 同意设置表单校验的触发时机
                    form={form}
                >
                    <Form.Item
                        className={'login-item'}
                        name={'mobile'}
                        rules={[
                            {
                                required: true,
                                message: '手机号不能为空'
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: '手机格式错误'
                            }
                        ]}
                    >
                        <Input ref={mobileRef} placeholder="请输入手机号"/>
                    </Form.Item>
                    <Form.Item
                        className={'login-item'}
                        name={'code'}
                        rules={[
                            {
                                required: true,
                                message: '验证码不能为空'
                            }
                        ]}
                        extra={<Button
                            size={"middle"}
                            color={'primary'}
                            onClick={getCode}
                            disabled={timeLeft !== 0}
                        >
                            {
                                timeLeft === 0 ? '发送验证码' : `${timeLeft}后重新发送`
                            }
                        </Button>}
                    >
                        <Input placeholder="请输入验证码"/>
                    </Form.Item>
                    {/*shouldUpdate => 表单的任意变化多会触发该区域的更新*/}
                    <Form.Item noStyle shouldUpdate>
                        {
                            () => {
                                const untouched = !form.isFieldsTouched(true)
                                const hasError = form.getFieldsError().some(item => item.errors.length)
                                const disable = untouched || hasError
                                // 实时判断表单校验是否通过
                                // 实时判断用户是否操作过该表单
                                // 校验通过 + 用户操作过该表单 => 允许登录
                               return <Button
                                    block
                                    disabled={disable}
                                    type='submit'
                                    color={'primary'}
                                    className={'login-submit'}
                                >登录</Button>
                            }
                        }
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
};
export default Login;
