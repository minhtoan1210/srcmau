import { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Form, Input } from 'antd'

import { resetPassword } from 'services/userServices'

type ResetPasswordType = {
  password: string
  confirm_password: string
}

export default function ResetPassword(): JSX.Element {
  const [form] = Form.useForm<ResetPasswordType>()
  const { token } = useParams()
  const navigate = useNavigate()

  const resetPasswordMute = useMutation(resetPassword, {
    onSuccess: () => {
      toast.success('Success reset your password!')
      navigate('/management/login')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const onFinish = (formData: ResetPasswordType): void => {
    resetPasswordMute.mutate({ ...formData, token })
  }

  return (
    <div style={{ width: 400 }} className='login'>
      <div className='login-title'>Reset password</div>
      <Form
        className='form-login'
        form={form}
        layout='vertical'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete='off'>
        <Form.Item name='password' label='Password' required>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name='confirm_password'
          label='Password Confirmation'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('The two passwords that you entered do not match!')
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Button loading={resetPasswordMute.isLoading} type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
