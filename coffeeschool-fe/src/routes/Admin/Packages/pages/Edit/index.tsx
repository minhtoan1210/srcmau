import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { PackageType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import { deletePackages, getPackagesDetail, updatePackages } from 'services/packageServices'

import PackageFormAddEdit from '../../components/FormAddEdit'

export default function PackagesEitPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading } = useQuery(['getPackagesDetail', id], () => {
    if (id) {
      return getPackagesDetail(id)
    }
  })

  const updatePackagesMutation = useMutation(updatePackages, {
    onSuccess: () => {
      toast.success('Updated')
      navigate('/management/packages')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const deleteSkillMutation = useMutation(deletePackages, {
    onSuccess: () => {
      toast.success('Deleted')
      navigate('/management/packages')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const onSubmitHandler = (data: PackageType): void => {
    if (id) {
      data.uuid = id
      updatePackagesMutation.mutate(data)
    }
  }

  return (
    <Card
      loading={isLoading || deleteSkillMutation.isLoading}
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
          &nbsp; Edit Packages
        </>
      }
      extra={
        <ConfirmDelete
          title='Delete'
          message={`Are you sure you want to delete this package`}
          useTitle
          onClick={() => {
            if (id) {
              deleteSkillMutation.mutate(id)
            }
          }}
          isLoading={false}
        />
      }>
      <PackageFormAddEdit
        data={data?.data}
        onSubmitHandler={onSubmitHandler}
        isUpdating={updatePackagesMutation.isLoading}
      />
    </Card>
  )
}
