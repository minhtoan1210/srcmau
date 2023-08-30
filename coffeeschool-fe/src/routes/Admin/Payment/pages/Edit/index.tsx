import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { ArrowLeftOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import CoursesFormAddEdit from '../../components/FromAddEdit'

export default function CoursesEitPage(): JSX.Element {
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
                onClick={() => navigate(-1)}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; Edit Courses
        </>
      }
      extra={
        <ConfirmDelete
          title='Delete'
          message={`Are you sure you want to delete Courses`}
          useTitle
          onClick={() => toast.success('Deleted')}
          isLoading={false}
        />
      }>
      <CoursesFormAddEdit />
    </Card>
  )
}
