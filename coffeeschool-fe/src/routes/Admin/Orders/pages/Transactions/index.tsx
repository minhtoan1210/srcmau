import { useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button, Card, Space, Table, TableColumnsType, Tag, Tooltip } from 'antd'

import { OrderStateStatusType, OrderTransactionType, OrderType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { getOrderTransactions } from 'services/orderServices'

const tagColor: Record<OrderStateStatusType, string> = {
  PAID: 'green',
  UNPAID: 'default',
}

const getColumns = (): TableColumnsType<OrderTransactionType> => [
  {
    title: 'Transaction Code',
    dataIndex: 'transactionCode',
    width: 200,
  },
  {
    title: 'Package',
    dataIndex: 'order',
    width: 200,
    render: (item: OrderType) => {
      return <Link to={`/management/packages/view/${item.package.uuid}`}>{item.package.name}</Link>
    },
  },
  {
    title: 'Status',
    dataIndex: 'order',
    width: 200,
    render: (value: OrderType) => {
      return <Tag color={tagColor[value.state.state_code]}>{value.state.state_code}</Tag>
    },
  },
]

export default function TransactionPage(): JSX.Element {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useQuery(['getOrderTransaction', id], () => {
    if (id) {
      return getOrderTransactions({}, id)
    }
  })

  return (
    <Card
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
          &nbsp; Order transactions
        </>
      }>
      <Table
        loading={isLoading}
        rowKey='uuid'
        scroll={{ x: 'max-content' }}
        className='table-striped-rows'
        columns={getColumns()}
        dataSource={data?.data || []}
        pagination={false}
      />
    </Card>
  )
}
