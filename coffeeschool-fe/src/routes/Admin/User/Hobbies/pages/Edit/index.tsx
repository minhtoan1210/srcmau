import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { HobbyType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import { deleteHobbies, getHobbiesDetail, updateHobbies } from 'services/hobbiesServices'

import HobbiesFormAddEdit from '../../components/FormAddEdit'

export default function HobbiesEitPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading } = useQuery(['getHobbiesDetail', id], () => {
    if (id) {
      return getHobbiesDetail(id)
    }
  })

  const updateHobbiesMutation = useMutation(updateHobbies, {
    onSuccess: () => {
      toast.success('Updated')
      navigate('/management/user/hobbies')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const deleteHobbyMutation = useMutation(deleteHobbies, {
    onSuccess: () => {
      toast.success('Deleted')
      navigate('/management/user/hobbies')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const onSubmitHandler = (data: HobbyType): void => {
    data.uuid = id
    updateHobbiesMutation.mutate(data)
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
                onClick={() => navigate('/management/user/hobbies')}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; Edit Hobbies
        </>
      }
      extra={
        <ConfirmDelete
          title='Delete'
          message={`Are you sure you want to delete user`}
          useTitle
          onClick={() => {
            if (id) {
              deleteHobbyMutation.mutate(id)
            }
          }}
          isLoading={deleteHobbyMutation.isLoading}
        />
      }>
      <HobbiesFormAddEdit
        data={data?.data}
        onSubmitHandler={onSubmitHandler}
        isUpdating={updateHobbiesMutation.isLoading}
      />
    </Card>
  )
}
