import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { createUsers } from 'services/userServices'

import UsersFormAdd from '../../components/FormAdd'

export default function UserAddPage(): JSX.Element {
  const navigate = useNavigate()

  const createUserMutation = useMutation(createUsers, {
    onSuccess: () => {
      toast.success('Created')
      navigate('/management/users-management')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const onCreateUserHandler = (data: any): void => {
    createUserMutation.mutate(data)
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
          &nbsp; Edit user
        </>
      }>
      <UsersFormAdd createUser={onCreateUserHandler} />
    </Card>
  )
}
