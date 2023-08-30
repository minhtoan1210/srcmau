// import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { Button, Card, Space, Table, TableColumnsType, TablePaginationConfig } from 'antd'
import Search from 'antd/lib/input/Search'
import { SorterResult } from 'antd/lib/table/interface'

import { AssignmentBoardType, QueryParamsType } from 'types'

import { EyeOutlined, PlusOutlined } from '@ant-design/icons'

import { getAssignments } from 'services/assignmentServices'

// import { PlusOutlined } from '@ant-design/icons'

// import ConfirmDelete from 'components/ConfirmDeleteButton'

const getColumns = (): TableColumnsType<AssignmentBoardType> => [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: 300,
  },
  {
    title: 'Course code',
    dataIndex: 'course_code',
    sorter: true,
    width: 300,
  },
  {
    title: 'Action',
    dataIndex: '',
    width: 120,
    fixed: 'right',
    align: 'center',
    render: (_value, record) => {
      return (
        <>
          <Link to={`view/${record.uuid}`}>
            <Button type='primary' icon={<EyeOutlined />} />
          </Link>
        </>
      )
    },
  },
]

export default function AssignmentsListPage(): JSX.Element {
  const [paramQueryModel, setParamQueryModel] = useState<QueryParamsType>({
    page: 1,
    per_page: 20,
    orderBy: undefined,
    orderDirection: 'desc',
    search: '',
    'searchIn[]': ['name'],
  })

  const { data, isLoading } = useQuery(['getFileCollections', paramQueryModel], () =>
    getAssignments(paramQueryModel)
  )

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: any,
    sorter: SorterResult<AssignmentBoardType> | SorterResult<AssignmentBoardType>[]
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
      title='Assignments'
      extra={
        <Space align='center'>
          <Search
            placeholder='input search text'
            allowClear
            enterButton='Search'
            onSearch={onSearch}
          />
          <Link to='add'>
            <Button icon={<PlusOutlined />}>Add Score Board</Button>
          </Link>
        </Space>
      }>
      <Table
        className='table-striped-rows'
        loading={isLoading}
        rowKey='uuid'
        scroll={{ x: 'max-content' }}
        columns={getColumns()}
        dataSource={data?.data.items}
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
