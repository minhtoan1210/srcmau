import moment from 'moment'

import { useEffect, useState } from 'react'

import { Button, Card, Checkbox, DatePicker, Form, Input, Tabs } from 'antd'

import { groupBy, map, orderBy } from 'lodash'

import { PropertiesType } from 'types'

import FormValidatedItem from 'components/FormValidatedItem'

import { ProfileFormType } from '../../types'

interface Props {
  data: PropertiesType[]
  propertiesData: PropertiesType[]
  onUpdateProfile: (data: ProfileFormType) => void
  isLoading?: boolean
}

export default function Profile({
  onUpdateProfile,
  data,
  propertiesData,
  isLoading,
}: Props): JSX.Element {
  const [form] = Form.useForm<ProfileFormType>()
  const [profile, setProfile] = useState<any>([])

  const onFinishHandler = (formData: ProfileFormType): void => {
    onUpdateProfile(formData)
  }

  useEffect(() => {
    if (data) {
      const groupedData = groupBy(propertiesData, 'category_uuid')
      const initFormData: ProfileFormType = {}

      const tabs = map(groupedData, (values, key) => {
        return {
          label: values[0].category.name,
          key,
          children: values.map(value => {
            return (
              <span key={value.uuid}>
                {value.type !== 'checkBox' ? (
                  <>
                    {value.type !== 'date' ? (
                      <FormValidatedItem
                        ruleType={value.type}
                        name={value.uuid}
                        label={value.name}
                        extra={
                          value.description && (
                            <span className='skill-description '>{value.description}</span>
                          )
                        }>
                        <Input disabled={value.type === 'email'} />
                      </FormValidatedItem>
                    ) : (
                      <Form.Item
                        name={value.uuid}
                        label={value.name}
                        extra={
                          value.description && (
                            <span className='skill-description '>{value.description}</span>
                          )
                        }>
                        <DatePicker format={'DD/MM/YYYY'} />
                      </Form.Item>
                    )}
                  </>
                ) : (
                  <Form.Item
                    name={value.uuid}
                    valuePropName='checked'
                    extra={
                      value.description && (
                        <span className='skill-description '>{value.description}</span>
                      )
                    }>
                    <Checkbox>{value.name}</Checkbox>
                  </Form.Item>
                )}
              </span>
            )
          }),
        }
      })

      const sortedTabs = orderBy(tabs, 'label')

      data.forEach(value => {
        if (value.uuid) {
          if (value.type === 'date') {
            initFormData[value.uuid] = value.value ? moment(value.value) : null
          } else if (value.type === 'checkBox') {
            initFormData[value.uuid] = value.value ? true : false
          } else {
            initFormData[value.uuid] = value.value
          }
        }
      })

      form.setFieldsValue(initFormData)

      setProfile(sortedTabs)
    }
  }, [data, propertiesData])

  return (
    <Form form={form} layout='vertical' onFinish={onFinishHandler}>
      <Card
        title='Profile'
        actions={[
          <>
            <Button loading={isLoading} type='primary' htmlType='submit'>
              Submit
            </Button>
          </>,
        ]}>
        <Tabs tabPosition='left' type='card' items={profile} />
      </Card>
    </Form>
  )
}
