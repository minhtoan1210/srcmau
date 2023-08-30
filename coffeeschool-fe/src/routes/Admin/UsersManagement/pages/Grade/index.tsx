import { v4 as uuidv4 } from 'uuid'

import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AutoComplete, Button, Card, Form, Space, Tabs } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { debounce, map } from 'lodash'

import { QueryParamsType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { getAssignments, getAssignmentsDetail } from 'services/assignmentServices'
import { gradeUser } from 'services/userServices'

import ScoreFrom from '../../components/ScoreForm'

const renderDetail = (name?: string, course_code?: string): JSX.Element => {
  return (
    <Space style={{ marginBottom: 16 }}>
      <span>Name: {name}</span>
      <span style={{ marginLeft: 32 }}>Course code: {course_code} </span>
    </Space>
  )
}

export default function GradePage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm()
  const [items, setItems] = useState<any[]>([])
  const [activeKey, setActiveKey] = useState<string>()

  const [assignment, setAssignment] = useState<string>()

  const [paramQueryModel, setParamQueryModel] = useState<QueryParamsType>({
    page: 1,
    per_page: 20,
    orderBy: undefined,
    orderDirection: 'desc',
    search: '',
    'searchIn[]': ['name'],
  })

  const { data: assignmentsData } = useQuery(['getAssignments', paramQueryModel], () =>
    getAssignments(paramQueryModel)
  )

  const gradeUerMutation = useMutation(gradeUser, {
    onSuccess() {
      toast.success('Created!')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  useQuery(
    ['getAssignmentsDetailToGrade', assignment],
    () => {
      if (assignment) {
        return getAssignmentsDetail(assignment)
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
                children: <ScoreFrom form={form} name={['boards', newActiveKey]} />,
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

  const searchAssignmentDebounce = debounce((value: string) => {
    setParamQueryModel(values => ({ ...values, search: value }))
  }, 300)

  const onFinish = (data: any): void => {
    const scores: any[] = []

    const boards = map(data.boards, value => {
      value.children.forEach((criteria: any) => {
        criteria.children.forEach((score: any) => {
          scores.push(...score.children)
        })
      })

      return value
    })

    const dataToSubmit = {
      name: form.getFieldValue('name'),
      course_code: form.getFieldValue('course_code'),
      boards,
      scores,
      assignment_uuid: assignment,
      user_uuid: id,
    }

    gradeUerMutation.mutate(dataToSubmit)
  }

  return (
    <Card
      title={
        <>
          <Space>
            <Tooltip title='Go Back'>
              <Button
                style={{ color: 'black' }}
                onClick={() => navigate(-1)}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; Grade
        </>
      }
      extra={
        <Space style={{ marginRight: 8 }}>
          <span style={{ display: 'flex', alignItems: 'center', paddingRight: 8 }}>
            Select Assignment:{' '}
          </span>
          <AutoComplete
            placeholder='Select Assignment'
            onSelect={(_, option) => {
              setAssignment(option.uuid)
            }}
            allowClear
            onClear={() => setAssignment(undefined)}
            onSearch={(value: string) => searchAssignmentDebounce(value)}
            options={assignmentsData?.data.items.map((item: any) => ({
              value: item.name,
              label: item.name,
              uuid: item.uuid,
            }))}
            style={{ width: 250 }}
          />
        </Space>
      }>
      {assignment ? (
        <Form form={form} onFinish={onFinish}>
          {renderDetail(form.getFieldValue('name'), form.getFieldValue('course_code'))}

          <Tabs type='card' onChange={onChange} activeKey={activeKey} items={items} />

          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Button loading={gradeUerMutation.isLoading} type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : (
        'Select assignment first.'
      )}
    </Card>
  )
}
