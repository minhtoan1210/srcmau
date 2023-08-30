import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { getRolesDetail } from 'services/systemServices'

import DetailPanel from '../../components/DetailPanel'

export default function RolesViewPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading } = useQuery(['getRolesDetail', id], () => {
    if (id) {
      return getRolesDetail(id)
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
                onClick={() => navigate('/management/system/roles')}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; View Roles
        </>
      }>
      <DetailPanel data={data?.data} />
    </Card>
  )
}
