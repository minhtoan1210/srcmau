import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { getCategoriesDetail } from 'services/userServices'

import DetailPanel from '../../components/DetailPanel'

export default function CategoriesViewPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading } = useQuery(['getCategoriesDetail', id], () => {
    if (id) {
      return getCategoriesDetail(id)
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
                onClick={() => navigate('/management/user/categories')}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; View Categories
        </>
      }>
      <DetailPanel data={data?.data} />
    </Card>
  )
}
