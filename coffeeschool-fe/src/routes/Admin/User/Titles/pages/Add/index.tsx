import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { createTitle } from 'services/titleServices'

import TitlesFormAddEdit from '../../components/FormAddEdit'

export default function TitlesAddPage(): JSX.Element {
  const navigate = useNavigate()

  const createTitleMutation = useMutation(createTitle, {
    onSuccess: () => {
      toast.success('Created')
      navigate('/management/user/titles')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const onCreateTitleHandler = (data: any): void => {
    createTitleMutation.mutate(data)
  }

  return (
    <Card
      title={
        <>
          <Space>
            <Tooltip title='Go Back'>
              <Button
                style={{ color: 'black' }}
                onClick={() => navigate('/management/user/titles')}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; Add Titles
        </>
      }>
      <TitlesFormAddEdit
        onSubmitHandler={onCreateTitleHandler}
        isUpdating={createTitleMutation.isLoading}
      />
    </Card>
  )
}
