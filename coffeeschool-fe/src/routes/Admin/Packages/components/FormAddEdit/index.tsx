import { useEffect } from 'react'

import { Button, Form, Input, InputNumber } from 'antd'

import { HobbyType, PackageType } from 'types'

interface Props {
  data?: HobbyType
  onSubmitHandler: (data: PackageType) => void
  isUpdating: boolean
}

const initData = {
  uuid: undefined,
  name: '',
  description: '',
}

export default function PackageFormAddEdit({
  data,
  onSubmitHandler,
  isUpdating,
}: Props): JSX.Element {
  const [form] = Form.useForm<PackageType>()

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data])

  const onFinish = (formData: PackageType): void => {
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
      <Form.Item
        name='description'
        label='Description'
        required
        rules={[
          {
            required: true,
            message: 'Please enter description!',
          },
        ]}>
        <Input maxLength={512} />
      </Form.Item>
      <Form.Item
        name='downloads'
        label='Downloads'
        required
        rules={[
          {
            required: true,
            message: 'Please enter download!',
          },
        ]}>
        <InputNumber maxLength={3} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        <Button type='primary' htmlType='submit' loading={isUpdating}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
