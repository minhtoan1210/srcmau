import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { getHobbiesDetail } from 'services/hobbiesServices'

import DetailPanel from '../../components/DetailPanel'

export default function HobbiesViewPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading } = useQuery(['getHobbiesDetail', id], () => {
    if (id) {
      return getHobbiesDetail(id)
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
                onClick={() => navigate('/management/user/hobbies')}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; View Hobbies
        </>
      }>
      <DetailPanel data={data?.data} />
    </Card>
  )
}
