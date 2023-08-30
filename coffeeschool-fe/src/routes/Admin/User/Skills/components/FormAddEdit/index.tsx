import { useEffect } from 'react'

import { Button, Form, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'

import { SkillType } from 'types'

interface Props {
  data?: SkillType
  onSubmitHandler: (data: SkillType) => void
  isUpdating: boolean
}

const initData = {
  uuid: undefined,
  name: '',
  icon: null,
  value: 0,
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
        <Input />
      </Form.Item>
      <Form.Item name='description' label='Description'>
        <TextArea maxLength={125} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        <Button type='primary' htmlType='submit' loading={isUpdating}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
