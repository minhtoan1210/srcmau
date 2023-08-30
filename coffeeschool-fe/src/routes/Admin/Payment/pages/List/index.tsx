import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

import { Button, Card, Space, Table, TableColumnsType, TablePaginationConfig, Tooltip } from 'antd'
import Search from 'antd/lib/input/Search'
import { SorterResult } from 'antd/lib/table/interface'

import { PaymentType, QueryParamsType } from 'types'

import { CheckCircleTwoTone, PayCircleOutlined } from '@ant-design/icons'

import { createTransaction, listTransactions } from 'services/orderServices'

const getColumns = (): TableColumnsType<PaymentType> => [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 300,
  },
  {
    title: 'Is Cash',
    dataIndex: 'is_cash',
    width: 80,
    render: value => {
      if (value) {
        return <CheckCircleTwoTone twoToneColor='#52c41a' />
      }

      return <CheckCircleTwoTone twoToneColor='red' />
    },
  },
  {
    title: 'Action',
    dataIndex: '',
    width: 180,
    fixed: 'right',
    align: 'center',
    render: () => {
      return (
        <Tooltip title='Pay now'>
          <Button
            type='primary'
            icon={<PayCircleOutlined />}
            // onClick={() => createTransaction(record.uuid)}
            // loading={isCreatingTransaction}
          />
        </Tooltip>
      )
    },
  },
]

export default function UserListPage(): JSX.Element {
  const [paramQueryModel, setParamQueryModel] = useState<QueryParamsType>({
    page: 1,
    per_page: 20,
    orderBy: undefined,
    search: '',
    'searchIn[]': ['name'],
  })

  const { data, isLoading, refetch } = useQuery(['getListTransactions', paramQueryModel], () =>
    listTransactions(paramQueryModel)
  )

  const createTransactionByCashMutation = useMutation(createTransaction, {
    onSuccess: () => {
      toast.success('Updated')
      refetch()
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: any,
    sorter: SorterResult<PaymentType> | SorterResult<PaymentType>[]
  ): void => {
    if (!Array.isArray(sorter)) {
      setParamQueryModel({
        ...paramQueryModel,
        page: pagination.current || 1,
        limit: pagination.pageSize || 25,
        orderBy: sorter.order
          ? `${sorter?.field} ${sorter.order === 'ascend' ? 'asc' : 'desc'}`
          : '',
      })
    }
  }

  const onSearch = (value: string): void => {
    setParamQueryModel({ ...paramQueryModel, search: value })
  }

  return (
    <Card
      title='Courses'
      extra={
        <Space align='center'>
          <Search
            placeholder='input search text'
            allowClear
            enterButton='Search'
            onSearch={onSearch}
          />
        </Space>
      }>
      <Table
        loading={isLoading}
        rowKey='uuid'
        scroll={{ x: 'max-content' }}
        className='table-striped-rows'
        columns={getColumns()}
        dataSource={data?.data.items || []}
        onChange={handleTableChange}
        pagination={{
          showSizeChanger: true,
          current: paramQueryModel.page,
          pageSize: paramQueryModel.per_page,
          total: data?.data.total,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </Card>
  )
}
