import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Select, Space, Table, TableColumnsType, TablePaginationConfig } from 'antd'
import Search from 'antd/lib/input/Search'
import { SorterResult } from 'antd/lib/table/interface'

import { OptionType, PropertiesType, QueryParamsType } from 'types'

import { CheckCircleTwoTone, EditFilled, EyeOutlined, PlusOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import {
  deleteProperties,
  getCategories,
  getProperties,
  publishProperty,
} from 'services/userServices'

const getColumns = (
  onDeleteHandler: (id?: string) => void,
  publishProperty: (value: boolean, uuid: string | undefined) => void
): TableColumnsType<PropertiesType> => [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: 300,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    sorter: true,
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Publish',
    dataIndex: 'is_published',
    width: 80,
    sorter: true,
    align: 'center',
    render: (value, record) => {
      return (
        <CheckCircleTwoTone
          onClick={() => publishProperty(!value, record.uuid)}
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
      const confirmDelete = 'Are you sure you want to delete this property'
      return (
        <>
          <Link to={`view/${record.uuid}`}>
            <Button type='primary' icon={<EyeOutlined />} />
          </Link>
          <Link style={{ marginLeft: 8 }} to={`edit/${record.uuid}`}>
            <Button type='primary' icon={<EditFilled />} />
          </Link>
          <ConfirmDelete
            style={{ marginLeft: 8 }}
            title='Delete'
            message={`${confirmDelete} ${record.name}`}
            onClick={() => onDeleteHandler(record.uuid)}
            useTitle={false}
            isLoading={false}
          />
        </>
      )
    },
  },
]

export default function FileListPage(): JSX.Element {
  const [categoriesOptions, setCategoriesOptions] = useState<OptionType[]>([])
  const [value, setValue] = useState('')
  const [paramQueryModel, setParamQueryModel] = useState<QueryParamsType>({
    category_uuid: '',
    page: 1,
    per_page: 20,
    orderBy: undefined,
    orderDirection: 'desc',
    search: '',
    'searchIn[]': ['name'],
  })

  const { data: categoriesData, isLoading } = useQuery(['getCategories'], () => {
    return getCategories()
  })

  const { data: propertiesData, refetch } = useQuery(['getProperties', paramQueryModel], () => {
    if (paramQueryModel.category_uuid) {
      return getProperties(paramQueryModel)
    }
  })

  const publishPropertyMutation = useMutation(publishProperty, {
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

  const onPublishPropertyHandler = (value: boolean, uuid: string | undefined): void => {
    publishPropertyMutation.mutate({ uuid, publish: value })
  }

  const deleteMutation = useMutation(deleteProperties, {
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

  useEffect(() => {
    if (categoriesData) {
      const option = categoriesData.data?.items.map((item: any) => {
        return {
          value: item.uuid,
          label: item.name,
        }
      })

      if (option.length) {
        setValue(option[0].value)
        setParamQueryModel({ ...paramQueryModel, category_uuid: option[0].value })
      }

      setCategoriesOptions(option)
    }
  }, [categoriesData])

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: any,
    sorter: SorterResult<PropertiesType> | SorterResult<PropertiesType>[]
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

  const onDeleteHandler = (id?: string): void => {
    if (id) {
      deleteMutation.mutate(id)
    }
  }

  const onSearch = (value: string): void => {
    setParamQueryModel({ ...paramQueryModel, search: value })
  }

  const setCategories = (id: string): void => {
    setValue(id)
    setParamQueryModel({ ...paramQueryModel, category_uuid: id })
  }

  return (
    <Card
      title='Properties'
      loading={isLoading}
      extra={
        <Space align='center'>
          <Search
            placeholder='input search text'
            allowClear
            enterButton='Search'
            onSearch={onSearch}
          />
          <Link to='add'>
            <Button icon={<PlusOutlined />}>Add Properties</Button>
          </Link>
        </Space>
      }>
      <span style={{ marginRight: 8 }}>Select Category</span>
      <Select
        onChange={e => setCategories(e)}
        style={{ marginBottom: '16px', width: 280 }}
        placeholder='Select category'
        value={value}>
        {categoriesOptions?.map(item => (
          <Select.Option key={item.value} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
      {paramQueryModel.category_uuid && (
        <Table
          rowKey='uuid'
          scroll={{ x: 'max-content' }}
          columns={getColumns(onDeleteHandler, onPublishPropertyHandler)}
          className='table-striped-rows'
          dataSource={propertiesData?.data.items || []}
          onChange={handleTableChange}
          pagination={{
            showSizeChanger: true,
            current: paramQueryModel.page,
            pageSize: paramQueryModel.per_page,
            total: propertiesData?.data.total || 0,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      )}
    </Card>
  )
}
