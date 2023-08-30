import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { getPropertiesDetail } from 'services/userServices'

import DetailPanel from '../../components/DetailPanel'

export default function PropertyViewPage(): JSX.Element {
  const navigate = useNavigate()

  const { id } = useParams()

  const { data, isLoading: isLoadingProperty } = useQuery(['getPropertiesDetail', id], () => {
    if (id) {
      return getPropertiesDetail(id)
    }
  })

  return (
    <Card
      loading={isLoadingProperty}
      title={
        <>
          <Space>
            <Tooltip title='Go Back'>
              <Button
                style={{ color: 'black' }}
                onClick={() => navigate('/management/user/properties')}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; View Property
        </>
      }>
      <DetailPanel data={data?.data} />
    </Card>
  )
}
