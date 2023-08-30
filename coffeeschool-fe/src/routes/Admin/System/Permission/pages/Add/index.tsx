import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { PermissionType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { createPermissions } from 'services/systemServices'

import PermissionsFormAddEdit from '../../components/FormAddEdit'

export default function PermissionsAddPage(): JSX.Element {
  const navigate = useNavigate()

  const createPermissionMutation = useMutation(createPermissions, {
    onSuccess: () => {
      toast.success('Created')
      navigate('/management/system/permissions')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const onCreatePermissionHandler = (data: PermissionType): void => {
    createPermissionMutation.mutate(data)
  }

  return (
    <Card
      title={
        <>
          <Space>
            <Tooltip title='Go Back'>
              <Button
                style={{ color: 'black' }}
                onClick={() => navigate('/management/system/permissions')}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; Add Permissions
        </>
      }>
      <PermissionsFormAddEdit
        onSubmitHandler={onCreatePermissionHandler}
        isUpdating={createPermissionMutation.isLoading}
      />
    </Card>
  )
}
