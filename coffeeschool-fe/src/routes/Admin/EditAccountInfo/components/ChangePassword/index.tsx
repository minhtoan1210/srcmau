import { Button, Card, Col, Form, Input, Row } from 'antd'

import { FormResetPasswordType } from '../../types'

interface Props {
  onChangePasswordHandler: (formData: FormResetPasswordType) => void
  isLoading?: boolean
  isAdmin?: boolean
}

export default function ChangePassword({
  onChangePasswordHandler,
  isLoading,
  isAdmin,
}: Props): JSX.Element {
  const [form] = Form.useForm<FormResetPasswordType>()

  const onSubmitHandler = async (): Promise<void> => {
    const row = await form.validateFields()

    onChangePasswordHandler(row)
  }

  return (
    <Card
      title='Change Password'
      actions={[
        <Button key={1} loading={isLoading} type='primary' onClick={onSubmitHandler}>
          Submit
        </Button>,
      ]}>
      <Form form={form} layout='vertical'>
        <Row justify='space-between' gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
          {!isAdmin && (
            <Col span={8}>
              <Form.Item
                name='old_password'
                label='Old Password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your old password!',
                  },
                ]}>
                <Input.Password />
              </Form.Item>
            </Col>
          )}

          <Col span={isAdmin ? 12 : 8}>
            <Form.Item
              name='password'
              label='Password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback>
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={isAdmin ? 12 : 8}>
            <Form.Item
              name='confirm_password'
              label='Confirm Password'
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
          </Col>
        </Row>
      </Form>
    </Card>
  )
}
