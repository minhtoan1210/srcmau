import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { getSkillsDetail } from 'services/skillsServices'

import DetailPanel from '../../components/DetailPanel'

export default function SkillsViewPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading } = useQuery(['getSkillsDetail', id], () => {
    if (id) {
      return getSkillsDetail(id)
    }
  })

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
          &nbsp; View Skill
        </>
      }>
      <DetailPanel data={data?.data} />
    </Card>
  )
}
