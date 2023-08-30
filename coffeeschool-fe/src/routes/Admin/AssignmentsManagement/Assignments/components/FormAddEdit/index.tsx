import { v4 as uuidv4 } from 'uuid'

import { useState } from 'react'

import { Button, Col, Form, Input, Modal, Row, Tabs } from 'antd'

import { map } from 'lodash'

import ScoreFrom from '../ScoreForm'

interface Props {
  onSubmit: (data: any) => void
  loading: boolean
}

export default function AssignmentFormAddEdit({ onSubmit, loading }: Props): JSX.Element {
  const [form] = Form.useForm()

  const [activeKey, setActiveKey] = useState<string>()
  const [items, setItems] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTabTitle, setNewTabTitle] = useState('')

  const showModal = (): void => {
    setIsModalOpen(true)
  }

  const handleOk = (): void => {
    if (newTabTitle) {
      const newActiveKey = uuidv4()
      const newPanes = [...items]

      newPanes.push({
        label: newTabTitle,
        children: <ScoreFrom form={form} name={['boards', newActiveKey]} labelName={newTabTitle} />,
        key: newActiveKey,
        forceRender: true,
      })

      setItems(newPanes)
      setActiveKey(newActiveKey)
      setNewTabTitle('')
    }

    setIsModalOpen(false)
  }

  const handleCancel = (): void => {
    setIsModalOpen(false)
  }

  const onFinish = (formData: any): void => {
    const dataToSubmit = {
      name: formData.name,
      course_code: formData.course_code,
      boards: map(formData.boards, value => value),
    }

    onSubmit(dataToSubmit)
  }

  const onChange = (newActiveKey: string): void => {
    setActiveKey(newActiveKey)
  }

  const remove = (targetKey: string): void => {
    let newActiveKey = activeKey
    let lastIndex = -1
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1
      }
    })

    const newPanes = items.filter(item => item.key !== targetKey)
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key
      } else {
        newActiveKey = newPanes[0].key
      }
    }

    setItems(newPanes)
    setActiveKey(newActiveKey)
  }

  const onEdit = (
    targetKey: string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
    action: 'add' | 'remove'
  ): void => {
    if (action === 'add') {
      showModal()
    } else if (typeof targetKey === 'string') {
      remove(targetKey)
    }
  }

  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name='name'
              label='Name'
              required
              rules={[
                {
                  required: true,
                  message: 'Please enter your name!',
                },
              ]}>
              <Input maxLength={124} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name='course_code'
              label='Course code'
              required
              rules={[
                {
                  required: true,
                  message: 'Please enter your course code',
                },
              ]}>
              <Input maxLength={124} />
            </Form.Item>
          </Col>
        </Row>

        <Tabs
          type='editable-card'
          onChange={onChange}
          activeKey={activeKey}
          onEdit={onEdit}
          items={items}
        />

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Button loading={loading} type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Modal title='Name' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input value={newTabTitle} onChange={e => setNewTabTitle(e.target.value)} />
      </Modal>
    </>
  )
}
