import { Button, Checkbox, Form, Input } from 'antd'

export type UserFormType = {
  userName: string
  email: string
  password: string
  passwordConfirmation: string
  roles: string[]
  mobile: string
  description: string
  status: string
  facebook: string
  instagram: string
  twitter: string
  birthDate: string
  address: string
  about: string
  portfolio: boolean
}

const options = [
  { label: 'Giảng viên', value: 'Giảng viên' },
  { label: 'Giáo vụ', value: 'Giáo vụ' },
  { label: 'Kế toán', value: 'Kế toán' },
  { label: 'Nhà tuyển dụng', value: 'Nhà tuyển dụng' },
  { label: 'Học viên', value: 'Học viên' },
  { label: 'Trợ giảng', value: 'Trợ giảng' },
  { label: 'Super Administrator', value: 'Super Administrator' },
]

export default function CoursesFormAdd(): JSX.Element {
  const [form] = Form.useForm<UserFormType>()

  const onFinish = (formData: UserFormType): void => {
    console.log('formData', formData)
  }

  return (
    <Form form={form} onFinish={onFinish} layout='vertical'>
      <Form.Item
        name='userName'
        label='User Name'
        required
        rules={[
          {
            required: true,
            message: 'Please enter your user name!',
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        name='email'
        label='Email'
        required
        rules={[
          {
            required: true,
            message: 'Please enter your email!',
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        name='password'
        label='Password'
        hasFeedback
        required
        rules={[
          {
            required: true,
            message: 'Please enter your password!',
          },
        ]}>
        <Input.Password />
      </Form.Item>
      <Form.Item
        name='passwordConfirmation'
        label='Password Confirmation'
        dependencies={['password']}
        hasFeedback
        required
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
      <Form.Item name='roles' label='User Role Permissions'>
        <Checkbox.Group options={options} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
