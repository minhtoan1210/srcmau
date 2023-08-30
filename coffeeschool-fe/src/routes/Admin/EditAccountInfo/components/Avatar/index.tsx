import { useState } from 'react'
import { toast } from 'react-toastify'

import { Button, Card, Upload } from 'antd'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload'

import { UploadOutlined } from '@ant-design/icons'

const validationFileType = (file: UploadFile): boolean => {
  const validImageTypes = ['image/jpeg', 'image/png']
  if (file.type && !validImageTypes.includes(file.type)) {
    toast.error('Accept Image File only!')
    return false
  }

  if (file.size) {
    const isLt10M = file.size / 1024 / 1024 < 5
    if (!isLt10M) {
      toast.error('File size smaller than 5MB!')
      return false
    }
  }

  return true
}

const onPreview = async (file: UploadFile): Promise<void> => {
  let src = file.url as string
  if (!src) {
    src = await new Promise(resolve => {
      const reader = new FileReader()
      reader.readAsDataURL(file.originFileObj as RcFile)
      reader.onload = () => resolve(reader.result as string)
    })
  }
  const image = new Image()
  image.src = src
  const imgWindow = window.open(src)
  imgWindow?.document.write(image.outerHTML)
}

interface Props {
  updateAvatarHandler: (file: RcFile) => void
  avatarUrl: string
  isLoading?: boolean
}

export default function Avatar({ updateAvatarHandler, avatarUrl, isLoading }: Props): JSX.Element {
  const [fileUpload, setFileUpload] = useState<UploadFile>()

  const onSubmitHandler = async (): Promise<void> => {
    if (fileUpload) {
      updateAvatarHandler(fileUpload as RcFile)
    } else {
      toast.warning('No image to upload!')
    }
  }

  // const onCancelHandler = (): void => {
  //   setFileUpload(undefined)
  // }

  const handleChange = ({ file }: UploadChangeParam<UploadFile>): void => {
    if (file.status === 'removed') {
      setFileUpload(undefined)
      return
    }

    if (validationFileType(file)) {
      setFileUpload(file)
    }
  }

  return (
    <Card
      title='Avatar'
      actions={[
        <>
          <Button loading={isLoading} type='primary' onClick={onSubmitHandler}>
            Submit
          </Button>
          {/* <Button style={{ marginLeft: 8 }} onClick={onCancelHandler}>
            Cancel
          </Button> */}
        </>,
      ]}>
      <div
        style={{
          display: 'flex',
        }}>
        {fileUpload === undefined && (
          <img
            src={avatarUrl}
            width={100}
            height={100}
            style={{
              marginRight: 8,
            }}
          />
        )}

        <Upload
          beforeUpload={() => false}
          multiple={false}
          maxCount={1}
          listType='picture-card'
          name='file'
          onPreview={onPreview}
          onChange={handleChange}>
          <Button icon={<UploadOutlined />} />
        </Upload>
      </div>
    </Card>
  )
}
