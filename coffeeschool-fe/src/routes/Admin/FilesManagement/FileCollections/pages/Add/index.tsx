import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { FileCollectionTableType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { createFileCollection } from 'services/userServices'

import FileCollectionFormAddEdit from '../../components/FormAddEdit'

export default function FileCollectionAddPage(): JSX.Element {
  const navigate = useNavigate()

  const createHobbyMutation = useMutation(createFileCollection, {
    onSuccess: () => {
      toast.success('Created')
      navigate('/management/files-management/file-collections')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const onCreateHobbyHandler = (data: FileCollectionTableType): void => {
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
                onClick={() => navigate('/management/files-management/file-collections')}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; Add File Collection
        </>
      }>
      <FileCollectionFormAddEdit
        onSubmitHandler={onCreateHobbyHandler}
        isUpdating={createHobbyMutation.isLoading}
      />
    </Card>
  )
}
