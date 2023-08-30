import { useEffect } from 'react'

import { Button, Checkbox, Col, Form, Input, Row } from 'antd'

import { SkillType } from 'types'

interface Props {
  data?: SkillType
  onSubmitHandler: (data: SkillType) => void
  isUpdating: boolean
}

export type TitleType = {
  uuid: string
  name: string
  authorizations: TitleAuthType
}

export type TitleAuthType = {
  view: boolean
  delete: boolean
  viewAny: boolean
  update: boolean
}

const initData = {
  uuid: undefined,
  name: '',
  authorizations: {
    view: true,
    delete: true,
    viewAny: true,
    update: true,
  },
}

export default function SkillsFormAddEdit({
  data,
  onSubmitHandler,
  isUpdating,
}: Props): JSX.Element {
  const [form] = Form.useForm<SkillType>()

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data])

  const onFinish = (formData: SkillType): void => {
    onSubmitHandler(formData)
  }

  return (
    <Form form={form} onFinish={onFinish} layout='vertical' initialValues={data ? data : initData}>
      <Form.Item
        name='name'
        label='Name'
        required
        rules={[
          {
            required: true,
            message: 'Please enter name!',
          },
        ]}>
        <Input maxLength={124} />
      </Form.Item>
      <span>Authorizations</span>
      <Row gutter={[16, 16]}>
        <Col>
          <Form.Item
            name={['authorizations', 'view']}
            valuePropName='checked'
            wrapperCol={{ offset: 0, span: 24 }}>
            <Checkbox>View</Checkbox>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name={['authorizations', 'delete']}
            valuePropName='checked'
            wrapperCol={{ offset: 0, span: 24 }}>
            <Checkbox>Delete</Checkbox>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name={['authorizations', 'viewAny']}
            valuePropName='checked'
            wrapperCol={{ offset: 0, span: 24 }}>
            <Checkbox>View any</Checkbox>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name={['authorizations', 'update']}
            valuePropName='checked'
            wrapperCol={{ offset: 0, span: 24 }}>
            <Checkbox>Update</Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        <Button type='primary' htmlType='submit' loading={isUpdating}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
