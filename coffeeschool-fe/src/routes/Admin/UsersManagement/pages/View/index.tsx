import { useState } from 'react'
import ReactJson from 'react-json-view'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Card, Space, Table, TableColumnsType, TablePaginationConfig } from 'antd'
import Tooltip from 'antd/es/tooltip'
import { SorterResult } from 'antd/lib/table/interface'

import { QueryParamsType, UserEventsType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { getUserDetail } from 'services/authServices'
import { getUserEvents } from 'services/userServices'

const getColumns = (): TableColumnsType<UserEventsType> => [
  {
    title: 'Category',
    dataIndex: 'category',
    width: 200,
  },
  {
    title: 'Event',
    dataIndex: 'event',
    width: 300,
  },
  {
    title: 'Payload',
    dataIndex: 'payload',
    width: 400,
    render(value) {
      return <ReactJson collapsed name='event payload' src={value} />
    },
  },
]

export default function UserViewPage(): JSX.Element {
  const navigate = useNavigate()

  const { id } = useParams()

  const [paramQueryModel, setParamQueryModel] = useState<QueryParamsType>({
    page: 1,
    per_page: 20,
    orderBy: undefined,
    orderDirection: 'desc',
    user_uuid: id,
  })

  const { data } = useQuery(['getUserDetail', id], () => {
    if (id) {
      return getUserDetail(id)
    }
  })

  const { data: userEvents, isLoading } = useQuery(['getUserEvents', paramQueryModel], () => {
    if (id) {
      return getUserEvents(paramQueryModel)
    }
  })

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
          &nbsp; Edit user
        </>
      }>
      <ReactJson src={data?.data} />

      <Table
        className='table-striped-rows'
        style={{ paddingTop: 16 }}
        loading={isLoading}
        rowKey='uuid'
        scroll={{ x: 'max-content' }}
        columns={getColumns()}
        dataSource={userEvents?.data.items || []}
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
