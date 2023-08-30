import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { Button, Form, Input, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'

import { HobbyType, IconType } from 'types'

import { getIcons } from 'services/userServices'

interface Props {
  data?: HobbyType
  onSubmitHandler: (data: HobbyType) => void
  isUpdating: boolean
}

const initData = {
  uuid: undefined,
  name: '',
  icon_uuid: undefined,
  description: undefined,
}

export default function HobbiesFormAddEdit({
  data,
  onSubmitHandler,
  isUpdating,
}: Props): JSX.Element {
  const [form] = Form.useForm<HobbyType>()
  const [iconOptions, setIconOptions] = useState<{ label: React.ReactNode; value: string }[]>([])

  useQuery('getIcons', getIcons, {
    onSuccess(data) {
      const options =
        data?.data?.items.map((item: IconType) => {
          return {
            value: item.uuid,
            label: (
              <span>
                <img width={20} src={`/assets/${item.file_name}`} /> {item.file_name}
              </span>
            ),
          }
        }) || []

      setIconOptions(options)
    },
  })

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data, icon_uuid: data.icon.uuid })
    }
  }, [data])

  const onFinish = (formData: HobbyType): void => {
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
      <Form.Item name='icon_uuid' label='Select Icon' rules={[{ required: true }]}>
        <Select
          placeholder='Select a option and change input text above'
          options={iconOptions}
          allowClear
        />
      </Form.Item>
      <Form.Item
        name='description'
        label='Description'
        required
        rules={[
          {
            required: true,
            message: 'Please enter name!',
          },
        ]}>
        <TextArea maxLength={512} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        <Button type='primary' htmlType='submit' loading={isUpdating}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
