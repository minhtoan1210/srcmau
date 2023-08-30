import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { PackageType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { createPackages } from 'services/packageServices'

import PackageFormAddEdit from '../../components/FormAddEdit'

export default function PackageAddPage(): JSX.Element {
  const navigate = useNavigate()

  const createHobbyMutation = useMutation(createPackages, {
    onSuccess: () => {
      toast.success('Created')
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

  const onCreateHobbyHandler = (data: PackageType): void => {
    createHobbyMutation.mutate(data)
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
          &nbsp; Add Package
        </>
      }>
      <PackageFormAddEdit
        onSubmitHandler={onCreateHobbyHandler}
        isUpdating={createHobbyMutation.isLoading}
      />
    </Card>
  )
}
