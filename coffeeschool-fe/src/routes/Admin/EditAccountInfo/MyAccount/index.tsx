import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space, Tooltip } from 'antd'
import { RcFile } from 'antd/lib/upload'

import { ArrowLeftOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import { getUserDetail, updatePassword } from 'services/authServices'
import { updateAvatar } from 'services/userServices'

import Avatar from '../components/Avatar'
import ChangePassword from '../components/ChangePassword'
import { FormResetPasswordType } from '../types'

interface Props {
  id?: string
}

export default function MyAccount({ id }: Props): JSX.Element {
  const navigate = useNavigate()

  const {
    data: userData,
    isLoading,
    refetch: refetchUserData,
  } = useQuery(['getUserDetail', id], () => getUserDetail(id))

  const updatePasswordMutation = useMutation(updatePassword, {
    onSuccess: () => {
      toast.success('Created')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const mutationUploadFile = useMutation(updateAvatar, {
    onError: err => {
      toast.error(`Error, ${err}.`)
    },
    onSuccess: () => {
      toast.success('Upload Successfully')
      refetchUserData()
    },
  })

  const onResetPasswordHandler = (form: FormResetPasswordType): void => {
    form.uuid = userData?.data.uuid
    updatePasswordMutation.mutate(form)
  }

  const onUploadAvatarHandler = (file: RcFile): void => {
    const formData = new FormData()
    formData.append('file', file)

    if (id) {
      return mutationUploadFile.mutate({ formData, id })
    }

    const user_uuid: string | null = localStorage.getItem('user_uuid')

    mutationUploadFile.mutate({ formData, id: user_uuid })
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
          {id ? <>&nbsp; My Account</> : 'My Account'}
        </>
      }
      extra={
        <>
          {id && (
            <ConfirmDelete
              title='Delete'
              message={`Are you sure you want to delete user`}
              useTitle
              onClick={() => toast.success('Deleted')}
              isLoading={false}
            />
          )}
        </>
      }>
      <Avatar
        avatarUrl={userData?.data.avatar}
        updateAvatarHandler={onUploadAvatarHandler}
        isLoading={mutationUploadFile.isLoading}
      />

      <ChangePassword
        onChangePasswordHandler={onResetPasswordHandler}
        isLoading={updatePasswordMutation.isLoading}
      />
    </Card>
  )
}
