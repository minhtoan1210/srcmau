import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { SkillType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import { deleteSkills, getSkillsDetail, updateSkills } from 'services/skillsServices'

import SkillsFormAddEdit from '../../components/FormAddEdit'

export default function SkillsEitPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading } = useQuery(['getSkillsDetail', id], () => {
    if (id) {
      return getSkillsDetail(id)
    }
  })

  const updateSkillsMutation = useMutation(updateSkills, {
    onSuccess: () => {
      toast.success('Updated')
      navigate('/management/user/skills')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const deleteSkillMutation = useMutation(deleteSkills, {
    onSuccess: () => {
      toast.success('Deleted')
      navigate('/management/user/skills')
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
    updateSkillsMutation.mutate(data)
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
                onClick={() => navigate('/management/user/skills')}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; Edit Skills
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
      <SkillsFormAddEdit
        data={data?.data}
        onSubmitHandler={onSubmitHandler}
        isUpdating={updateSkillsMutation.isLoading}
      />
    </Card>
  )
}
