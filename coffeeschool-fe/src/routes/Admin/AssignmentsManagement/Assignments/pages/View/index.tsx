import { v4 as uuidv4 } from 'uuid'

import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Card, Form, Space, Tabs } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { getAssignmentsDetail } from 'services/assignmentServices'

import AssignmentDetailFrom from '../../components/AssignmentDetailFrom'

const renderDetail = (name?: string, course_code?: string): JSX.Element => {
  return (
    <Space style={{ marginBottom: 16 }}>
      <span>Name: {name}</span>
      <span style={{ marginLeft: 32 }}>Course code: {course_code} </span>
    </Space>
  )
}

export default function AssignmentViewPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm()
  const [items, setItems] = useState<any[]>([])
  const [activeKey, setActiveKey] = useState<string>()

  useQuery(
    ['getAssignmentsDetail', id],
    () => {
      if (id) {
        return getAssignmentsDetail(id)
      }
    },
    {
      onSuccess(dataResponse) {
        if (dataResponse) {
          form.resetFields()
          form.setFieldsValue({
            name: dataResponse.data.name,
            course_code: dataResponse.data.course_code,
          })

          setItems(
            dataResponse.data.boards.map((x: any, index: number) => {
              const newActiveKey = uuidv4()
              if (index === 0) {
                setActiveKey(newActiveKey)
              }

              form.setFieldValue(['boards', newActiveKey], { ...x })

              return {
                label: x.labelName,
                children: <AssignmentDetailFrom form={form} name={['boards', newActiveKey]} />,
                key: newActiveKey,
                forceRender: true,
              }
            })
          )
        }
      },
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  )

  const onChange = (newActiveKey: string): void => {
    setActiveKey(newActiveKey)
  }

  return (
    <Card
      title={
        <>
          <Space>
            <Tooltip title='Go Back'>
              <Button
                style={{ color: 'black' }}
                onClick={() => navigate('/management/assignments-management/assignments')}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; Assignment
        </>
      }>
      <Form form={form}>
        {renderDetail(form.getFieldValue('name'), form.getFieldValue('course_code'))}

        <Tabs type='card' onChange={onChange} activeKey={activeKey} items={items} />
      </Form>
    </Card>
  )
}
