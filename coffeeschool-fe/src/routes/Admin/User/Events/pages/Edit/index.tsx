import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { EventType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import { deleteEvents, getEventsDetail, updateEvents } from 'services/eventsServices'

import EventsFormAddEdit from '../../components/FormAddEdit'

export default function EventEitPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading } = useQuery(['getEventsDetail', id], () => {
    if (id) {
      return getEventsDetail(id)
    }
  })

  const updateEventsMutation = useMutation(updateEvents, {
    onSuccess: () => {
      toast.success('Updated')
      navigate('/management/user/events')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const deleteSkillMutation = useMutation(deleteEvents, {
    onSuccess: () => {
      toast.success('Deleted')
      navigate('/management/user/events')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const onSubmitHandler = (data: EventType): void => {
    data.uuid = id
    updateEventsMutation.mutate(data)
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
                onClick={() => navigate('/management/user/events')}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; Edit Event
        </>
      }
      extra={
        <ConfirmDelete
          title='Delete'
          message={`Are you sure you want to delete user`}
          useTitle
          onClick={() => {
            if (id) {
              deleteSkillMutation.mutate(id)
            }
          }}
          isLoading={false}
        />
      }>
      <EventsFormAddEdit
        data={data?.data}
        onSubmitHandler={onSubmitHandler}
        isUpdating={updateEventsMutation.isLoading}
      />
    </Card>
  )
}
