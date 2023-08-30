import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { ArrowLeftOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

export default function AssignmentEitPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()

  console.log('id', id)

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
          &nbsp; Edit Score Board
        </>
      }
      extra={
        <ConfirmDelete
          title='Delete'
          message={`Are you sure you want to delete user`}
          useTitle
          onClick={() => toast.success('Deleted')}
          isLoading={false}
        />
      }>
      Edit Score Board
    </Card>
  )
}
