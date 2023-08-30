import { useEffect } from 'react'

import { Button, Card, Checkbox, Form } from 'antd'

import { RoleType } from 'types'

import { ProfileFormType } from '../../types'

interface Props {
  loading: boolean
  data: RoleType[]
  rolesData: RoleType[]
  onUpdateRoles: (data: ProfileFormType) => void
}

export default function Roles({ onUpdateRoles, data, rolesData, loading }: Props): JSX.Element {
  const [form] = Form.useForm<ProfileFormType>()

  const onFinishHandler = (formData: ProfileFormType): void => {
    onUpdateRoles(formData)
  }

  useEffect(() => {
    if (data) {
      const initFormData: ProfileFormType = {}

      data.forEach(value => {
        if (value.uuid) {
          initFormData[value.uuid] = value.value
        }
      })

      form.setFieldsValue(initFormData)
    }
  }, [data])

  return (
    <Form form={form} layout='vertical' onFinish={onFinishHandler}>
      <Card
        loading={loading}
        title='Roles'
        actions={[
          <>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
            <Button style={{ marginLeft: 8 }}>Cancel</Button>
          </>,
        ]}>
        {rolesData?.map(role => {
          return (
            <Form.Item key={role.uuid} name={role.uuid} valuePropName='checked'>
              <Checkbox>{role.name}</Checkbox>
            </Form.Item>
          )
        })}
      </Card>
    </Form>
  )
}
