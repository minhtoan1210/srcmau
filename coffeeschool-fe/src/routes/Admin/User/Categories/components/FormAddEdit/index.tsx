import { useEffect } from 'react'

import { Button, Form, Input } from 'antd'

import { CategoryType } from 'types'

interface Props {
  data?: CategoryType
  onSubmitHandler: (data: CategoryType) => void
  isUpdating: boolean
}

const initData = {
  uuid: undefined,
  name: '',
  slug: '',
  entity: '',
}

export default function CategoriesFormAddEdit({
  data,
  onSubmitHandler,
  isUpdating,
}: Props): JSX.Element {
  const [form] = Form.useForm<CategoryType>()

  const onFinish = (formData: CategoryType): void => {
    onSubmitHandler(formData)
  }

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data])

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
        <Input />
      </Form.Item>

      <Form.Item
        name='entity'
        label='Entity'
        required
        rules={[
          {
            required: true,
            message: 'Please enter entity!',
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        <Button type='primary' htmlType='submit' loading={isUpdating}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
