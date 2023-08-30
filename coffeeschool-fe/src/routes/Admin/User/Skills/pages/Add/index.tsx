import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { SkillType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { createSkills } from 'services/skillsServices'

import SkillsFormAddEdit from '../../components/FormAddEdit'

export default function SkillsAddPage(): JSX.Element {
  const navigate = useNavigate()

  const createSkillMutation = useMutation(createSkills, {
    onSuccess: () => {
      toast.success('Created')
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

  const onCreateSkillHandler = (data: SkillType): void => {
    createSkillMutation.mutate(data)
  }

  return (
    <Card
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
          &nbsp; Add Skills
        </>
      }>
      <SkillsFormAddEdit
        onSubmitHandler={onCreateSkillHandler}
        isUpdating={createSkillMutation.isLoading}
      />
    </Card>
  )
}
