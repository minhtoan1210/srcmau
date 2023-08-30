import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { EventType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { createEvents } from 'services/eventsServices'

import EventsFormAddEdit from '../../components/FormAddEdit'

export default function EventAddPage(): JSX.Element {
  const navigate = useNavigate()

  const createEventMutation = useMutation(createEvents, {
    onSuccess: () => {
      toast.success('Created')
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

  const onCreateEventHandler = (data: EventType): void => {
    createEventMutation.mutate(data)
  }

  return (
    <Card
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
          &nbsp; Add Event
        </>
      }>
      <EventsFormAddEdit
        onSubmitHandler={onCreateEventHandler}
        isUpdating={createEventMutation.isLoading}
      />
    </Card>
  )
}
