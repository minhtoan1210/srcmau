import { useEffect } from 'react'

import { Button, Checkbox, Col, Form, Input, InputNumber, Row } from 'antd'
import TextArea from 'antd/lib/input/TextArea'

import { AssignmentItemType } from 'types'

interface Props {
  data?: AssignmentItemType
  onSubmitHandler: (data: AssignmentItemType) => void
  isUpdating: boolean
}

const initData: AssignmentItemType = {
  uuid: undefined,
  title: '',
  description: '',
  min_score: 0,
  max_score: 0,
  coefficient: 0,
  positive: false,
  maxScores: 0,
}

export default function AssignmentItemsFormAddEdit({
  data,
  onSubmitHandler,
  isUpdating,
}: Props): JSX.Element {
  const [form] = Form.useForm<AssignmentItemType>()

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title,
        coefficient: data.coefficient,
        max_score: data.max_score,
        min_score: data.min_score,
        positive: data.positive,
        description: data.description,
      })
    }
  }, [data])

  const onFinish = (formData: AssignmentItemType): void => {
    onSubmitHandler(formData)
  }

  return (
    <Form form={form} onFinish={onFinish} layout='vertical' initialValues={data ? data : initData}>
      <Form.Item
        name='title'
        label='Title'
        required
        rules={[
          {
            required: true,
            message: 'Please enter title!',
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
        <TextArea maxLength={512} />
      </Form.Item>

      <Row gutter={[16, 16]}>
        <Col>
          <Form.Item
            name='coefficient'
            label='Coefficient'
            required
            rules={[
              {
                required: true,
                message: 'Please enter your coefficient!',
              },
            ]}>
            <InputNumber maxLength={124} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name='max_score'
            label='Max Score'
            required
            rules={[
              {
                required: true,
                message: 'Please enter your max score!',
              },
            ]}>
            <InputNumber maxLength={124} />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item
            name='min_score'
            label='Min score'
            required
            rules={[
              {
                required: true,
                message: 'Please enter your min score',
              },
            ]}>
            <InputNumber maxLength={124} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name='positive' label='Positive' valuePropName='checked'>
        <Checkbox />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        <Button type='primary' htmlType='submit' loading={isUpdating}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
