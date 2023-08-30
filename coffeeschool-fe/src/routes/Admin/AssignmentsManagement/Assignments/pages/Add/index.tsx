import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { createAssignments } from 'services/assignmentServices'

import AssignmentFormAddEdit from '../../components/FormAddEdit'

export default function AssignmentAddPage(): JSX.Element {
  const navigate = useNavigate()

  const createAssignmentMutation = useMutation(createAssignments, {
    onSuccess() {
      toast.success('Created!')
      navigate('/management/assignments-management/assignments')
    },
    onError(error: any) {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

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
          &nbsp; Add Score Board
        </>
      }>
      <AssignmentFormAddEdit
        onSubmit={data => createAssignmentMutation.mutate(data)}
        loading={createAssignmentMutation.isLoading}
      />
    </Card>
  )
}
