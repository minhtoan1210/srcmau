import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { Button, Card, Space, Table, TableColumnsType, TablePaginationConfig } from 'antd'
import Search from 'antd/lib/input/Search'
import { SorterResult } from 'antd/lib/table/interface'

import { AssignmentItemType, QueryParamsType } from 'types'

import { CheckCircleTwoTone, PlusOutlined } from '@ant-design/icons'

import { getAssignmentItems } from 'services/assignmentServices'

const getColumns = (): TableColumnsType<AssignmentItemType> => [
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: true,
    width: 240,
  },
  {
    title: 'Min Score',
    dataIndex: 'min_score',
    sorter: true,
    width: 160,
  },
  {
    title: 'Max Score',
    dataIndex: 'max_score',
    sorter: true,
    width: 160,
  },
  {
    title: 'Coefficient',
    dataIndex: 'coefficient',
    sorter: true,
    width: 160,
  },
  {
    title: 'Positive',
    dataIndex: 'positive',
    sorter: true,
    width: 80,
    align: 'center',
    render: value => {
      return <CheckCircleTwoTone twoToneColor={value ? '#52c41a' : 'red'} />
    },
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: 460,
  },
]

export default function BoardCategoryListPage(): JSX.Element {
  const [paramQueryModel, setParamQueryModel] = useState<QueryParamsType>({
    page: 1,
    per_page: 20,
    orderBy: undefined,
    orderDirection: 'desc',
    search: '',
    'searchIn[]': ['title'],
  })

  const { data, isLoading } = useQuery(['getAssignmentItems', paramQueryModel], () =>
    getAssignmentItems(paramQueryModel)
  )

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: any,
    sorter: SorterResult<AssignmentItemType> | SorterResult<AssignmentItemType>[]
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

  const onSearch = (value: string): void => {
    setParamQueryModel({ ...paramQueryModel, search: value })
  }

  return (
    <Card
      title='Assignment Items'
      extra={
        <Space align='center'>
          <Search
            placeholder='input search text'
            allowClear
            enterButton='Search'
            onSearch={onSearch}
          />
          <Link to='add'>
            <Button icon={<PlusOutlined />}>Add Assignment Item</Button>
          </Link>
        </Space>
      }>
      <Table
        className='table-striped-rows'
        loading={isLoading}
        rowKey='uuid'
        scroll={{ x: 'max-content' }}
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
