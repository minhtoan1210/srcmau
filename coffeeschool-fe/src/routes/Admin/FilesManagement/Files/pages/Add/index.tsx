import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AutoComplete, Button, Card, Input, Select, Space, UploadFile } from 'antd'
import Tooltip from 'antd/es/tooltip'
import { RcFile, UploadChangeParam, UploadProps } from 'antd/lib/upload'
import Dragger from 'antd/lib/upload/Dragger'

import { debounce } from 'lodash'

import { ArrowLeftOutlined, InboxOutlined } from '@ant-design/icons'

import { getFileCollections, getUsers, uploadUserFiles } from 'services/userServices'

export default function FileAddPage(): JSX.Element {
  const navigate = useNavigate()

  const [fileUpload, setFileUpload] = useState<UploadFile>()
  const [selectedCollection, setSelectedCollection] = useState('')
  const [title, setTitle] = useState('')
  const [selectedUser, setSelectedUser] = useState('')

  const [userQueryParams, setUserQueryParams] = useState({
    'searchIn[]': ['name'],
    search: '',
  })

  const { data: usersData } = useQuery(['getListUsers', userQueryParams], () =>
    getUsers(userQueryParams)
  )

  const { data: fileCollections, isLoading } = useQuery(['getFileCollections'], getFileCollections)

  const mutationUploadFile = useMutation(uploadUserFiles, {
    onError: (err: any) => {
      toast.error(err.response.data.messages[0])
    },
    onSuccess: () => {
      toast.success('Upload Successfully')
      navigate('/management/files-management/files')
    },
  })

  const searchUserDebounce = debounce((value: string) => {
    setUserQueryParams(values => ({ ...values, search: value }))
  }, 300)

  const validationFileType = (file: UploadFile): boolean => {
    if (file.size) {
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        toast.error('File size smaller than 3MB!')
        return false
      }
    }

    return true
  }

  const handleChange = ({ file }: UploadChangeParam<UploadFile>): void => {
    if (file.status === 'removed') {
      setFileUpload(undefined)
      return
    }

    if (validationFileType(file)) {
      setFileUpload(file)
    } else {
      setFileUpload(undefined)
    }
  }

  const onUploadFilesHandler = (file: RcFile): void => {
    const formData = new FormData()
    formData.append('files[]', file)
    formData.append('file_collection_uuid', selectedCollection)
    formData.append('title[]', title)

    if (selectedUser) {
      return mutationUploadFile.mutate({ formData, id: selectedUser })
    }

    const user_uuid: string | null = localStorage.getItem('user_uuid')

    mutationUploadFile.mutate({ formData, id: user_uuid })
  }

  const onSubmitHandler = async (): Promise<void> => {
    if (fileUpload) {
      onUploadFilesHandler(fileUpload as RcFile)
    } else {
      toast.warning('No image to upload!')
    }
  }

  const propsUploader: UploadProps = {
    name: 'file',
    multiple: false,
    beforeUpload: () => false,
    onChange: handleChange,
  }

  return (
    <Card
      loading={isLoading}
      title={
        <>
          <Space>
            <Tooltip title='Go Back'>
              <Button
                style={{ color: 'black' }}
                onClick={() => navigate('/management/files-management/files')}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          Files
        </>
      }
      actions={[
        <Button
          disabled={!selectedCollection || !fileUpload || !title}
          type='primary'
          loading={mutationUploadFile.isLoading}
          onClick={onSubmitHandler}
          key='Submit'>
          Submit
        </Button>,
      ]}>
      <Space style={{ marginRight: 8 }}>
        <span style={{ display: 'flex', alignItems: 'center', paddingRight: 8 }}>
          Select User:{' '}
        </span>
        <AutoComplete
          placeholder='<< Me >>'
          onSelect={(_, option) => {
            setSelectedUser(option.userId)
          }}
          onSearch={(value: string) => searchUserDebounce(value)}
          options={usersData?.data.items.map((item: any) => ({
            value: item.name,
            label: item.name,
            userId: item.uuid,
          }))}
          style={{ width: 250 }}
        />
      </Space>
      <span>Select Collection</span>
      <Select
        style={{ minWidth: 250, paddingLeft: 16 }}
        value={selectedCollection}
        onSelect={(value: string) => setSelectedCollection(value)}
        options={fileCollections?.data.items.map((x: any) => ({ value: x.uuid, label: x.name }))}
      />
      <div style={{ marginTop: 16, display: 'flex' }}>
        <span
          style={{
            marginRight: 4,
            color: '#ff4d4f',
            fontSize: 14,
          }}>
          *
        </span>
        <span>Title</span>
      </div>
      <Input
        style={{ marginTop: 8, marginBottom: 16 }}
        title='Title'
        value={title}
        onChange={e => setTitle(e.currentTarget.value)}
      />
      <Dragger {...propsUploader} maxCount={1}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>Click or drag file to this area to upload</p>
      </Dragger>
    </Card>
  )
}
