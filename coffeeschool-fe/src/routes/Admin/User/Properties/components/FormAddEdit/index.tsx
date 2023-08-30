import { useEffect } from 'react'

import { Button, Checkbox, Form, Input, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'

import { OptionType, PropertiesType } from 'types'

import { propertyOptions } from 'constants/PropertiesType'

interface Props {
  data?: PropertiesType
  onSubmitHandler: (data: PropertiesType) => void
  isUpdating: boolean
  categoriesOptions: OptionType[]
}

const initData = {
  uuid: undefined,
  category_uuid: '',
  name: '',
  type: 'text',
  entity: '',
  paid_required: false,
  description: '',
}

export default function PropertyFormAddEdit({
  data,
  onSubmitHandler,
  isUpdating,
  categoriesOptions,
}: Props): JSX.Element {
  const [form] = Form.useForm<PropertiesType>()

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        type: data.type,
        category_uuid: data.category_uuid,
        description: data.description,
      })
    }
  }, [data])

  const onFinish = (formData: PropertiesType): void => {
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

      <Form.Item
        name='type'
        label='Type'
        rules={[
          {
            required: true,
            message: 'Please select type!',
          },
        ]}>
        <Select options={propertyOptions} />
      </Form.Item>

      <Form.Item name='paid_required' label='Paid Required' valuePropName='checked'>
        <Checkbox />
      </Form.Item>

      <Form.Item
        name='category_uuid'
        label='Category'
        rules={[
          {
            required: true,
            message: 'Please select category!',
          },
        ]}>
        <Select options={categoriesOptions} />
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
