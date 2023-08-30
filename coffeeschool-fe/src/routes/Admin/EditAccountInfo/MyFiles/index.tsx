import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Input, Select, Space, Tooltip, UploadProps } from 'antd'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload'
import Dragger from 'antd/lib/upload/Dragger'

import { ArrowLeftOutlined, InboxOutlined } from '@ant-design/icons'

import { getFileCollections, uploadUserFiles } from 'services/userServices'

interface Props {
  id?: string
}

export default function MyFiles({ id }: Props): JSX.Element {
  const navigate = useNavigate()
  const [fileUpload, setFileUpload] = useState<UploadFile>()
  const [selectedCollection, setSelectedCollection] = useState('')
  const [title, setTitle] = useState('')

  const { data: fileCollections, isLoading } = useQuery(['getFileCollections'], getFileCollections)

  const mutationUploadFile = useMutation(uploadUserFiles, {
    onError: (err: any) => {
      toast.error(err.response.data.messages[0])
    },
    onSuccess: () => {
      toast.success('Upload Successfully')
    },
  })

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

    if (id) {
      return mutationUploadFile.mutate({ formData, id })
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
                onClick={() => navigate(-1)}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          {id ? <>&nbsp; User Files</> : 'User Files'}
        </>
      }
      actions={[
        <Button
          disabled={!selectedCollection || !fileUpload || !title}
          type='primary'
          onClick={onSubmitHandler}
          key='Submit'>
          Submit
        </Button>,
      ]}>
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
