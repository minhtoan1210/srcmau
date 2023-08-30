import { useEffect } from 'react'

import { Button, Form, Input } from 'antd'

import { FileCollectionTableType, HobbyType } from 'types'

interface Props {
  data?: HobbyType
  onSubmitHandler: (data: FileCollectionTableType) => void
  isUpdating: boolean
}

const initData = {
  uuid: undefined,
  name: '',
}

export default function FileCollectionFormAddEdit({
  data,
  onSubmitHandler,
  isUpdating,
}: Props): JSX.Element {
  const [form] = Form.useForm<FileCollectionTableType>()

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data])

  const onFinish = (formData: FileCollectionTableType): void => {
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
