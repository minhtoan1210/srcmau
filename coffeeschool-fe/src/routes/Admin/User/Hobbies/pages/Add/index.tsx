import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { HobbyType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { createHobbies } from 'services/hobbiesServices'

import HobbiesFormAddEdit from '../../components/FormAddEdit'

export default function HobbiesAddPage(): JSX.Element {
  const navigate = useNavigate()

  const createHobbyMutation = useMutation(createHobbies, {
    onSuccess: () => {
      toast.success('Created')
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

  const onCreateHobbyHandler = (data: HobbyType): void => {
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
                onClick={() => navigate('/management/user/hobbies')}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; Add Hobby
        </>
      }>
      <HobbiesFormAddEdit
        onSubmitHandler={onCreateHobbyHandler}
        isUpdating={createHobbyMutation.isLoading}
      />
    </Card>
  )
}
