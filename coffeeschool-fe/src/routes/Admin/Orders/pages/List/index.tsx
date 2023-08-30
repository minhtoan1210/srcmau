import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  AutoComplete,
  Button,
  Card,
  Space,
  Table,
  TableColumnsType,
  TablePaginationConfig,
  Tag,
  Tooltip,
} from 'antd'
import Search from 'antd/lib/input/Search'
import { SorterResult } from 'antd/lib/table/interface'

import { debounce } from 'lodash'

import {
  FilterType,
  OrderStateStatusType,
  OrderStateType,
  OrderType,
  OrderUserType,
  PackageType,
  QueryParamsType,
} from 'types'

import { PayCircleOutlined, PlusOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import { createTransaction, deleteOrders, getOrders } from 'services/orderServices'
import { getPackages } from 'services/packageServices'
import { getUsers } from 'services/userServices'

import OrderModal from '../../components/OrderModal'
import PaymentModal from '../../components/PaymentModal'

const tagColor: Record<OrderStateStatusType, string> = {
  PAID: 'green',
  UNPAID: 'default',
}

const getColumns = (
  onDeleteHandler: (id?: string) => void,
  isDeleting: boolean,
  createTransaction: (id: string) => void,
  isCreatingTransaction: boolean,
  filterPackages: FilterType[]
): TableColumnsType<OrderType> => [
  {
    title: 'User Name',
    dataIndex: 'user',
    render: (user: OrderUserType) => {
      return (
        <Link to={`/portfolios/${user.uuid}`} target='_blank'>
          {user.name}
        </Link>
      )
    },
  },
  {
    title: 'Package',
    dataIndex: 'package',
    filters: filterPackages,
    filterSearch: true,
    render: (item: PackageType) => {
      return <Link to={`/management/packages/view/${item.uuid}`}>{item.name}</Link>
    },
  },
  {
    title: 'Status',
    dataIndex: 'state',
    width: 200,
    render: (value: OrderStateType) => {
      return <Tag color={tagColor[value.state_code]}>{value.state_code}</Tag>
    },
  },
  {
    title: 'Action',
    dataIndex: '',
    width: 180,
    fixed: 'right',
    align: 'center',
    render: (_value, record) => {
      const confirmDelete = 'Are you sure you want to delete this order? '
      return (
        <>
          <Tooltip title='Pay now'>
            <Button
              disabled={record.state.is_final}
              type='primary'
              icon={<PayCircleOutlined />}
              onClick={() => createTransaction(record.uuid)}
              loading={isCreatingTransaction}
            />
          </Tooltip>

          <Tooltip title='View Transactions'>
            <Link style={{ marginLeft: 8 }} to={`transactions/${record.uuid}`}>
              <Button type='primary' icon={<PayCircleOutlined />} />
            </Link>
          </Tooltip>

          <ConfirmDelete
            disabled={record.state.is_final}
            loading={isDeleting}
            style={{ marginLeft: 8 }}
            title='Delete'
            message={confirmDelete}
            onClick={() => onDeleteHandler(record.uuid)}
            useTitle={false}
            isLoading={false}
          />
        </>
      )
    },
  },
]

export default function OrderListPage(): JSX.Element {
  const [paramQueryModel, setParamQueryModel] = useState<QueryParamsType>({
    page: 1,
    per_page: 20,
    orderBy: undefined,
    orderDirection: 'desc',
    search: '',
    'searchIn[]': ['name'],
    'whereHas[package][uuid]': undefined,
    'whereHas[user][uuid]': undefined,
  })

  const [userQueryParams, setUserQueryParams] = useState<QueryParamsType>({
    page: 1,
    per_page: 20,
    search: '',
    'searchIn[]': ['name'],
  })

  const [filterPackages, setFilterPackages] = useState<FilterType[]>([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<string>()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading, refetch } = useQuery(['getOrders', paramQueryModel], () =>
    getOrders(paramQueryModel)
  )

  const searchUserDebounce = debounce((value: string) => {
    setUserQueryParams(values => ({ ...values, search: value }))
  }, 300)

  useQuery(['getCategories'], getPackages, {
    onSuccess(data) {
      const filterData = data.data.items.map((item: PackageType) => {
        return {
          text: item.name,
          value: item.uuid,
        }
      })

      setFilterPackages(filterData)
    },
  })

  const { data: usersData } = useQuery(['getUsers', userQueryParams], () =>
    getUsers(userQueryParams)
  )

  const deleteOrderMutation = useMutation(deleteOrders, {
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

  const createTransactionMutation = useMutation(createTransaction, {
    onSuccess: data => {
      window.open(data.data.data.checkoutUrl, '_blank', 'noopener,noreferrer')
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

  const onDeleteHandler = (id?: string): void => {
    if (id) {
      deleteOrderMutation.mutate(id)
    }
  }

  const onCreateTransactionHandler = (id: string): void => {
    setSelectedOrder(id)
    setIsOpenModal(true)
  }

  const onCancelPayByCashHandler = (): void => {
    setSelectedOrder(undefined)
    setIsOpenModal(false)
  }

  const onSubmitPayByCashHandler = async (data: any): Promise<void> => {
    if (data.selectedTransaction?.isCash) {
      await createTransactionByCashMutation.mutateAsync({
        uuid: selectedOrder,
        payment_provider_uuid: data.selectedTransaction.payment_provider_uuid,
        remarks: data.remarks,
        bill_id: data.billNumber,
      })
    } else {
      await createTransactionMutation.mutateAsync({
        uuid: selectedOrder,
        payment_provider_uuid: data.selectedTransaction.payment_provider_uuid,
      })
    }

    setIsOpenModal(false)
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: SorterResult<OrderType> | SorterResult<OrderType>[]
  ): void => {
    const packageIds = filters?.package || undefined
    const user = filters?.user || undefined

    if (!Array.isArray(sorter)) {
      setParamQueryModel({
        ...paramQueryModel,
        page: pagination.current || 1,
        per_page: pagination.pageSize || 20,
        orderBy: sorter.order ? `${sorter?.field}` : undefined,
        orderDirection: sorter.order === 'ascend' ? 'asc' : 'desc',
        'whereHas[package][uuid]': packageIds,
        'whereHas[user][uuid]': user,
      })
    }
  }

  const onSearch = (value: string): void => {
    setParamQueryModel({ ...paramQueryModel, search: value })
  }

  const showModal = (): void => {
    setIsModalOpen(true)
  }

  const handleOk = (): void => {
    setIsModalOpen(false)
  }

  const handleCancel = (): void => {
    setIsModalOpen(false)
  }

  return (
    <Card
      title='Orders'
      extra={
        <Space align='center'>
          <Search
            placeholder='input search text'
            allowClear
            enterButton='Search'
            onSearch={onSearch}
          />

          {/* <Link to='add'>
            <Button icon={<PlusOutlined />}>Add Order</Button>
          </Link> */}

          <Button icon={<PlusOutlined />} onClick={showModal}>
            Add Order
          </Button>

          <OrderModal isOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
        </Space>
      }>
      <Space style={{ marginRight: 8, paddingBottom: 10, paddingTop: 0 }}>
        <span style={{ display: 'flex', alignItems: 'center', paddingRight: 8 }}>
          Select User:{' '}
        </span>
        <AutoComplete
          allowClear
          onClear={() => {
            setParamQueryModel(oldParams => ({
              ...oldParams,
              'whereHas[user][uuid]': undefined,
            }))
          }}
          placeholder='Select user'
          onSelect={(_, option) => {
            setParamQueryModel(oldParams => ({
              ...oldParams,
              'whereHas[user][uuid]': option.userId,
            }))
          }}
          onSearch={(value: string) => searchUserDebounce(value)}
          options={usersData?.data.items.map((item: any) => ({
            value: item.name,
            label: item.name,
            userId: item.uuid,
          }))}
          style={{ width: 250 }}
        />
      </Space>
      <Table
        loading={isLoading}
        rowKey='uuid'
        scroll={{ x: 'max-content' }}
        className='table-striped-rows'
        columns={getColumns(
          onDeleteHandler,
          deleteOrderMutation.isLoading,
          onCreateTransactionHandler,
          createTransactionMutation.isLoading || createTransactionMutation.isLoading,
          filterPackages
        )}
        dataSource={data?.data.items || []}
        onChange={handleTableChange}
        pagination={{
          showSizeChanger: true,
          current: paramQueryModel.page,
          pageSize: paramQueryModel.per_page,
          total: data?.total || 0,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />

      <PaymentModal
        isOpen={isOpenModal}
        handleOk={onSubmitPayByCashHandler}
        handleCancel={onCancelPayByCashHandler}
        loading={createTransactionByCashMutation.isLoading || createTransactionMutation.isLoading}
      />
    </Card>
  )
}
