import { useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { Button, Form, Input } from 'antd'

import { requestResetPassword } from 'services/userServices'

type RequestResetPasswordType = {
  email: string
}

export default function ForgotPassword(): JSX.Element {
  const [form] = Form.useForm<RequestResetPasswordType>()
  const [isSuccess, setIsSuccess] = useState(false)

  const requestResetPasswordMute = useMutation(requestResetPassword, {
    onSuccess: () => {
      toast.success('Please check your email to reset your password ')
      setIsSuccess(true)
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const onFinish = ({ email }: RequestResetPasswordType): void => {
    requestResetPasswordMute.mutate({ email })
  }

  return (
    <div style={{ width: 400 }} className='login'>
      <div className='login-title'>Reset password</div>
      <div
        style={{
          textAlign: 'center',
        }}>
        Enter your email to reset your password.
      </div>
      {isSuccess ? (
        <div>Please check your email to reset your password</div>
      ) : (
        <Form
          className='form-login'
          form={form}
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Button loading={requestResetPasswordMute.isLoading} type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  )
}
