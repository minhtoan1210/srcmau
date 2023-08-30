import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { RoleType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import { deleteRoles, getRolesDetail, updateRoles } from 'services/systemServices'

import RoleFormAddEdit from '../../components/FormAddEdit'

export default function RoleEitPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading } = useQuery(['getRoleDetail', id], () => {
    if (id) {
      return getRolesDetail(id)
    }
  })

  const updateRoleMutation = useMutation(updateRoles, {
    onSuccess: () => {
      toast.success('Updated')
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

  const deleteRoleMutation = useMutation(deleteRoles, {
    onSuccess: () => {
      toast.success('Deleted')
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

  const onSubmitHandler = (data: RoleType): void => {
    if (id) {
      data.uuid = id
    }

    updateRoleMutation.mutate(data)
  }

  return (
    <Card
      loading={isLoading || deleteRoleMutation.isLoading}
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
          &nbsp; Edit Role
        </>
      }
      extra={
        <ConfirmDelete
          title='Delete'
          message={`Are you sure you want to delete user`}
          useTitle
          onClick={() => {
            if (id) {
              deleteRoleMutation.mutate(id)
            }
          }}
          isLoading={false}
        />
      }>
      <RoleFormAddEdit
        data={data?.data}
        onSubmitHandler={onSubmitHandler}
        isUpdating={updateRoleMutation.isLoading}
      />
    </Card>
  )
}
