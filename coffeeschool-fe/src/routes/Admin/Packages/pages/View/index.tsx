import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { getPackagesDetail } from 'services/packageServices'

import DetailPanel from '../../components/DetailPanel'

export default function PackageViewPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading } = useQuery(['getPackagesDetail', id], () => {
    if (id) {
      return getPackagesDetail(id)
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
          &nbsp; View Package
        </>
      }>
      <DetailPanel data={data?.data} />
    </Card>
  )
}
