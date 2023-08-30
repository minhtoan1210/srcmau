import { useState } from 'react'
import { UseMutationResult, useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  AutoComplete,
  Button,
  Card,
  Select,
  Space,
  Table,
  TableColumnsType,
  TablePaginationConfig,
} from 'antd'
import Search from 'antd/lib/input/Search'
import { SorterResult } from 'antd/lib/table/interface'

import { debounce } from 'lodash'

import { FileCollectionTableType, FileType, QueryParamsType } from 'types'

import { CheckCircleTwoTone, PlusOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import {
  deleteFile,
  getFileCollections,
  getFiles,
  getUsers,
  publicFile,
  updateFiles,
} from 'services/userServices'

const getColumns = (
  onDeleteHandler: (id: string) => void,
  isDeleting: boolean,
  updateUserMutation: UseMutationResult<
    unknown,
    unknown,
    {
      id?: string | null | undefined
      dataToSubmit: any
    },
    unknown
  >,
  onPublishHobbyHandler: (value: boolean, uuid: string | undefined) => void
): TableColumnsType<FileType> => [
  {
    title: 'File Name',
    dataIndex: 'filename',
  },
  {
    title: 'File Collection',
    dataIndex: 'collection',
    render(value: FileCollectionTableType) {
      return value?.name
    },
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: true,
  },
  {
    title: 'User',
    dataIndex: 'user',
    render(user) {
      return user.name
    },
  },
  {
    title: 'Publish',
    dataIndex: 'is_published',
    width: 200,
    sorter: true,
    render: (value, record) => {
      return (
        <CheckCircleTwoTone
          onClick={() => onPublishHobbyHandler(!value, record.uuid)}
          style={{ cursor: 'pointer' }}
          twoToneColor={value ? '#52c41a' : 'red'}
        />
      )
    },
  },
  {
    title: 'Action',
    dataIndex: '',
    width: 180,
    fixed: 'right',
    align: 'center',
    render: (_value, record) => {
      const confirmDelete = 'Are you sure you want to delete this file '
      return (
        <ConfirmDelete
          loading={isDeleting}
          style={{ marginLeft: 8 }}
          title='Delete'
          message={`${confirmDelete} ${record.filename}`}
          onClick={() => onDeleteHandler(record.uuid)}
          useTitle={false}
          isLoading={false}
        />
      )
    },
  },
]

export default function FilesListPage(): JSX.Element {
  const [paramQueryModel, setParamQueryModel] = useState<QueryParamsType>({
    page: 1,
    per_page: 20,
    orderBy: undefined,
    orderDirection: 'desc',
    search: '',
    'searchIn[]': ['title', 'filename'],
    'whereHas[user][uuid]': undefined,
    'whereHas[collection][uuid]': undefined,
  })
  const [userQueryParams, setUserQueryParams] = useState({
    'searchIn[]': ['name'],
    search: '',
  })

  const { data, isLoading, refetch } = useQuery(['getFiles', paramQueryModel], () =>
    getFiles(paramQueryModel)
  )

  const { data: usersData } = useQuery(['getListUsers', userQueryParams], () =>
    getUsers(userQueryParams)
  )

  const { data: fileCollections } = useQuery(['getFileCollections'], getFileCollections)

  const updateUserFileMutation = useMutation(updateFiles, {
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

  const publishFileMutation = useMutation(publicFile, {
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

  const deleteUserFileMutation = useMutation(deleteFile, {
    onSuccess: () => {
      toast.success('Deleted')
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

  const onDeleteHandler = (id: string): void => {
    deleteUserFileMutation.mutate(id)
  }

  const onPublishHobbyHandler = (value: boolean, uuid: string | undefined): void => {
    publishFileMutation.mutate({ uuid, is_published: value })
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: any,
    sorter: SorterResult<FileType> | SorterResult<FileType>[]
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

  const searchUserDebounce = debounce((value: string) => {
    setUserQueryParams(values => ({ ...values, search: value }))
  }, 300)

  return (
    <Card
      title='My Files'
      extra={
        <Space align='center'>
          <Search
            placeholder='input search text'
            allowClear
            enterButton='Search'
            onSearch={onSearch}
          />
          <Link to='add'>
            <Button icon={<PlusOutlined />}>Add File</Button>
          </Link>
        </Space>
      }>
      <AutoComplete
        onSelect={(_, option) => {
          setParamQueryModel(oldState => ({
            ...oldState,
            'whereHas[user][uuid]': option.userId,
          }))
        }}
        allowClear
        onClear={() => {
          setParamQueryModel(oldState => ({
            ...oldState,
            'whereHas[user][uuid]': undefined,
          }))
        }}
        onSearch={(value: string) => searchUserDebounce(value)}
        options={usersData?.data.items.map((item: any) => ({
          value: item.name,
          label: item.name,
          userId: item.uuid,
        }))}
        style={{ width: 250, paddingBottom: 10, paddingTop: 0 }}
        placeholder='Search user'
      />
      <Select
        style={{ minWidth: 250, paddingLeft: 16 }}
        placeholder='Select collection'
        value={paramQueryModel['whereHas[collection][uuid]']}
        onSelect={(value: string) =>
          setParamQueryModel({ ...paramQueryModel, 'whereHas[collection][uuid]': value })
        }
        allowClear
        onClear={() => {
          setParamQueryModel({ ...paramQueryModel, 'whereHas[collection][uuid]': undefined })
        }}
        options={fileCollections?.data.items.map((x: any) => ({ value: x.uuid, label: x.name }))}
      />
      <Table
        className='table-striped-rows'
        loading={isLoading}
        rowKey='uuid'
        scroll={{ x: 'max-content' }}
        columns={getColumns(
          onDeleteHandler,
          deleteUserFileMutation.isLoading,
          updateUserFileMutation,
          onPublishHobbyHandler
        )}
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
