import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { PermissionType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import { deletePermissions, getPermissionsDetail, updatePermissions } from 'services/systemServices'

import PermissionFormAddEdit from '../../components/FormAddEdit'

export default function PermissionEitPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading } = useQuery(['getPermissionDetail', id], () => {
    if (id) {
      return getPermissionsDetail(id)
    }
  })

  const updatePermissionMutation = useMutation(updatePermissions, {
    onSuccess: () => {
      toast.success('Updated')
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

  const deletePermissionMutation = useMutation(deletePermissions, {
    onSuccess: () => {
      toast.success('Deleted')
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

  const onSubmitHandler = (data: PermissionType): void => {
    if (id) {
      data.uuid = id
    }
    updatePermissionMutation.mutate(data)
  }

  return (
    <Card
      loading={isLoading || deletePermissionMutation.isLoading}
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
          &nbsp; Edit Permission
        </>
      }
      extra={
        <ConfirmDelete
          title='Delete'
          message={`Are you sure you want to delete user`}
          useTitle
          onClick={() => {
            if (id) {
              deletePermissionMutation.mutate(id)
            }
          }}
          isLoading={false}
        />
      }>
      <PermissionFormAddEdit
        data={data?.data}
        onSubmitHandler={onSubmitHandler}
        isUpdating={updatePermissionMutation.isLoading}
      />
    </Card>
  )
}
