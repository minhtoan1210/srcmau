import dayjs from 'dayjs'
import { selectUserProfile } from 'store/UserSlice/selector'

import { useState } from 'react'
import ReactJson from 'react-json-view'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'

import { Card, Table, TableColumnsType, TablePaginationConfig } from 'antd'
import { SorterResult } from 'antd/lib/table/interface'

import { QueryParamsType, UserEventsType } from 'types'

import { getMyEvents } from 'services/userServices'

const getColumns = (): TableColumnsType<UserEventsType> => [
  {
    title: 'Category',
    dataIndex: 'category',
    width: 200,
    sorter: true,
  },
  {
    title: 'Date',
    dataIndex: 'created_at',
    width: 100,
    sorter: true,
    render(value) {
      return <span>{dayjs(value).format('DD/MM/YYYY')}</span>
    },
  },
  {
    title: 'Event',
    dataIndex: 'event',
    width: 300,
    sorter: true,
  },
  {
    title: 'Payload',
    dataIndex: 'payload',
    width: 400,
    sorter: true,
    render(value) {
      return <ReactJson collapsed name='event payload' src={value} />
    },
  },
]

export default function DashboardPage(): JSX.Element {
  const { uuid } = useSelector(selectUserProfile)

  const [paramQueryModel, setParamQueryModel] = useState<QueryParamsType>({
    page: 1,
    per_page: 20,
    orderBy: undefined,
    orderDirection: 'desc',
  })

  const { data, isLoading } = useQuery(
    ['getMyEvents', paramQueryModel, uuid],
    () => getMyEvents(paramQueryModel, uuid),
    {
      enabled: !!uuid,
    }
  )

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: any,
    sorter: SorterResult<UserEventsType> | SorterResult<UserEventsType>[]
  ): void => {
    if (!Array.isArray(sorter)) {
      setParamQueryModel({
        ...paramQueryModel,
        page: pagination.current || 1,
        per_page: pagination.pageSize || 20,
        orderBy: sorter.order ? `${sorter?.field}` : undefined,
        orderDirection: sorter.order === 'ascend' ? 'asc' : 'desc',
      })
    }
  }

  return (
    <Card title='Dashboards'>
      <Table
        className='table-striped-rows'
        loading={isLoading}
        rowKey='uuid'
        scroll={{ x: 'max-content' }}
        columns={getColumns()}
        bordered
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
