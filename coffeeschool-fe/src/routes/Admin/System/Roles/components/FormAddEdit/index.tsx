import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { Button, Checkbox, Form, Input } from 'antd'

import { OptionType, RoleType } from 'types'

import { getPermissions } from 'services/systemServices'

interface Props {
  data?: RoleType
  onSubmitHandler: (data: RoleType) => void
  isUpdating: boolean
}

const initData = {
  uuid: undefined,
  name: '',
  icon: null,
  value: 0,
}

export default function RolesFormAddEdit({
  data,
  onSubmitHandler,
  isUpdating,
}: Props): JSX.Element {
  const [form] = Form.useForm<RoleType>()

  const [permissionSelectOptions, setPermissionSelectOptions] = useState<OptionType[]>()

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data])

  useQuery(
    'getAllPermissions',
    () =>
      getPermissions({
        per_page: 200,
      }),
    {
      onSuccess({ data }) {
        const options: OptionType[] = data.items.map((x: any) => {
          return {
            value: x.uuid,
            label: x.name,
          }
        })

        setPermissionSelectOptions(options)
      },
    }
  )

  const onFinish = (formData: RoleType): void => {
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
      <Form.Item name='permissions' label='Permisstions'>
        <Checkbox.Group options={permissionSelectOptions} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        <Button type='primary' htmlType='submit' loading={isUpdating}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
