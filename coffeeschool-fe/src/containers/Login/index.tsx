import { userActions } from 'store/UserSlice'

import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Checkbox, Form, Input } from 'antd'

import { logIn } from 'services/authServices'

import './style.scss'
import logo from '/assets/logo-1.png'

type LoginFormType = {
  username: string
  password: string
  remember: boolean
}

export default function Login(): JSX.Element {
  const [form] = Form.useForm<LoginFormType>()
  const navigate = useNavigate()

  const navigation_login = localStorage.getItem('navigation_login')

  const loginMute = useMutation(logIn, {
    onSuccess: (res: any) => {
      if (res?.status === 200) {
        userActions.userLogIn(res?.data.data)
        localStorage.setItem('access_token', res?.data.data.properties.access_token)
        localStorage.setItem('user_uuid', res?.data.data.attributes.uuid)

        if (res?.data.data.attributes.roles[0] === 'Super Administrator') {
          navigate('/management/users-management')
        } else if (navigation_login) {
          localStorage.removeItem('navigation_login')
          navigate(`${navigation_login}`)
        } else {
          navigate('/management/dashboard')
        }
      }
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const onFinish = ({ username, password }: LoginFormType): void => {
    loginMute.mutate({ username, password })
  }

  return (
    <>
      <div className='login'>
        <div className='login-container'>
          <div className='login-left'>
            <img className='login-left_img' src={logo} />
            <div className='login-left_text'>
              <div className='text_title'>
                Chào mừng bạn đến với hệ thống học tập trực tuyến thuộc Barista School
              </div>
              <div className='text_sub'>
                Bạn hãy sử dụng mã học viên tại Barista School để đăng nhập. <br />
                Nếu chưa có mã học viên, bạn thể liên hệ Quản lý lớp hoặc Tổng đài{' '}
                <span className='phone'> 1900 636 246</span> để được hỗ trợ.
              </div>
            </div>
          </div>
          <div className='login-right'>
            <div className='login-title'>Đăng Nhập</div>
            <Form
              className='form-login'
              form={form}
              layout='vertical'
              labelCol={{ span: 23 }}
              wrapperCol={{ span: 23 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete='off'>
              <Form.Item
                label='Username'
                name='username'
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
              </Form.Item>

              <Form.Item
                name='remember'
                valuePropName='checked'
                wrapperCol={{ offset: 0, span: 24 }}>
                <Checkbox>
                  Ghi Nhớ Tài Khoản<nav></nav>
                </Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                <Button loading={loginMute.isLoading} type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <div className='login-forgot'>
              <Link to='/forgot-password'>Forgot Your Password?</Link>
            </div>
            <div className='login-register'>
              <a href='#'> Register</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
