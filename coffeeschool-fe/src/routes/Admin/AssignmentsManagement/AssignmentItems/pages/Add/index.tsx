import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { AssignmentItemType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { createAssignmentItem } from 'services/assignmentServices'

import AssignmentItemsFormAddEdit from '../../components/FormAddEdit'

export default function BoardCategoryAddPage(): JSX.Element {
  const navigate = useNavigate()

  const createItemMutation = useMutation(createAssignmentItem, {
    onSuccess() {
      toast.success('Created!')
      navigate('/management/assignments-management/assignment-items')
    },
  })

  const onCreateItemHandler = (data: AssignmentItemType): void => {
    createItemMutation.mutate(data)
  }

  return (
    <Card
      title={
        <>
          <Space>
            <Tooltip title='Go Back'>
              <Button
                style={{ color: 'black' }}
                onClick={() => navigate('/management/assignments-management/assignment-items')}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; Add Assignment item
        </>
      }>
      <AssignmentItemsFormAddEdit
        onSubmitHandler={onCreateItemHandler}
        isUpdating={createItemMutation.isLoading}
      />
    </Card>
  )
}
