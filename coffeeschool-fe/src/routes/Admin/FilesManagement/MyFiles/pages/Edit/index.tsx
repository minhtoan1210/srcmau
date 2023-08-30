import { useMutation } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

// import { FileCollectionTableType } from 'types'
import { ArrowLeftOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import {
  deleteFileCollection, // getFileCollectionDetail,
  // updateFileCollection,
} from 'services/userServices'

// import FileCollectionFormAddEdit from '../../components/FormAddEdit'

export default function FileCollectionEitPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()

  // const { data, isLoading } = useQuery(['getFileCollectionDetail', id], () => {
  //   if (id) {
  //     return getFileCollectionDetail(id)
  //   }
  // })

  // const updateFileCollectionMutation = useMutation(updateFileCollection, {
  //   onSuccess: () => {
  //     toast.success('Updated')
  //     navigate('/management/files-management/file-collections')
  //   },
  //   onError: () => {
  //     toast.error('There are some errors. Please contact Administrator for detail')
  //   },
  // })

  const deleteFileCollectionMutation = useMutation(deleteFileCollection, {
    onSuccess: () => {
      toast.success('Deleted')
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

  // const onSubmitHandler = (data: FileCollectionTableType): void => {
  //   if (id) {
  //     data.uuid = id
  //     updateFileCollectionMutation.mutate(data)
  //   }
  // }

  return (
    <Card
      // loading={isLoading}
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
          &nbsp; Edit File Collection
        </>
      }
      extra={
        <ConfirmDelete
          title='Delete'
          message='Are you sure you want to delete this file collection?'
          useTitle
          onClick={() => {
            if (id) {
              deleteFileCollectionMutation.mutate(id)
            }
          }}
          isLoading={deleteFileCollectionMutation.isLoading}
        />
      }>
      {/* <FileCollectionFormAddEdit
        data={data?.data}
        onSubmitHandler={onSubmitHandler}
        isUpdating={updateFileCollectionMutation.isLoading}
      /> */}
    </Card>
  )
}
