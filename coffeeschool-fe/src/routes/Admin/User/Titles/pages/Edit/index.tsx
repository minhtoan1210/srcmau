import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { SkillType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import { deleteTitle, getTitleDetail, updateTitle } from 'services/titleServices'

import TitlesFormAddEdit from '../../components/FormAddEdit'

export default function TitlesEitPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading } = useQuery(['getTitlesDetail', id], () => {
    if (id) {
      return getTitleDetail(id)
    }
  })

  const updateTitlesMutation = useMutation(updateTitle, {
    onSuccess: () => {
      toast.success('Updated')
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

  const deleteSkillMutation = useMutation(deleteTitle, {
    onSuccess: () => {
      toast.success('Deleted')
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

  const onSubmitHandler = (data: SkillType): void => {
    data.uuid = id
    updateTitlesMutation.mutate(data)
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
                onClick={() => navigate('/management/user/titles')}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; Edit Title
        </>
      }
      extra={
        <ConfirmDelete
          title='Delete'
          message={`Are you sure you want to delete title`}
          useTitle
          onClick={() => {
            if (id) {
              deleteSkillMutation.mutate(id)
            }
          }}
          isLoading={false}
        />
      }>
      <TitlesFormAddEdit
        data={data?.data}
        onSubmitHandler={onSubmitHandler}
        isUpdating={updateTitlesMutation.isLoading}
      />
    </Card>
  )
}
