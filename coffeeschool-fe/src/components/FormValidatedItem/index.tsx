import { isPhoneNumber } from 'class-validator'

import React from 'react'

import { Form, FormItemProps } from 'antd'

interface Props {
  name?: string
  isRequired?: boolean
  ruleType?: 'email' | 'phone' | 'date' | 'district' | 'position' | 'mobile' | 'checkBox'
  label?: string | React.ReactNode
}

export default function FormValidatedItem(props: Props & FormItemProps): JSX.Element {
  const { name, isRequired, ruleType, label, ...rest } = props
  const required = isRequired ? { required: true } : {}
  let type = {}
  if (ruleType) {
    switch (ruleType) {
      case 'email': {
        type = { type: 'email' }
        break
      }
      case 'mobile':
      case 'phone': {
        type = {
          message: 'Invalid phone number. It should be +84, +65...',
          validator: (_: any, value: string) => {
            if (isPhoneNumber(value) || !value) {
              return Promise.resolve()
            }
            return Promise.reject()
          },
        }
        break
      }
      default:
        type = {}
    }
  }

  return (
    <Form.Item label={label} name={name} rules={[required, type]} {...rest}>
      {props.children}
    </Form.Item>
  )
}
