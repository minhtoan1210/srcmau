import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { RoleType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { createRoles } from 'services/systemServices'

import RolesFormAddEdit from '../../components/FormAddEdit'

export default function RolesAddPage(): JSX.Element {
  const navigate = useNavigate()

  const createRoleMutation = useMutation(createRoles, {
    onSuccess: () => {
      toast.success('Created')
      navigate('/management/system/roles')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const onCreateRoleHandler = (data: RoleType): void => {
    createRoleMutation.mutate(data)
  }

  return (
    <Card
      title={
        <>
          <Space>
            <Tooltip title='Go Back'>
              <Button
                style={{ color: 'black' }}
                onClick={() => navigate('/management/system/roles')}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; Add Roles
        </>
      }>
      <RolesFormAddEdit
        onSubmitHandler={onCreateRoleHandler}
        isUpdating={createRoleMutation.isLoading}
      />
    </Card>
  )
}
