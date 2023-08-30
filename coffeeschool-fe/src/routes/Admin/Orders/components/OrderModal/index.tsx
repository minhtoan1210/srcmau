import { selectUserProfile } from 'store/UserSlice/selector'

import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { Button, Form, Modal, Select } from 'antd'

import { createOrders } from 'services/orderServices'
import { getPackagesNew } from 'services/packageServices'

interface Props {
  isOpen?: boolean
  handleOk: () => void
  handleCancel: () => void
  loading?: boolean
}

export default function OrderModal({ isOpen, handleCancel, handleOk }: Props): JSX.Element {
  const { uuid } = useSelector(selectUserProfile)

  const [packageUuid, setPackageUuid] = useState<string>()

  const { data: listPackages } = useQuery(['getPackagesNew'], () => getPackagesNew())

  const handleChange = (value: string) => {
    setPackageUuid(value)
  }

  const handleChangeAdd = () => {
    if (packageUuid) {
      addOrderMutate.mutate({
        user_uuid: uuid,
        package_uuid: packageUuid,
      })
    } else {
      toast.error('Please choose package')
    }
  }

  const addOrderMutate = useMutation(createOrders, {
    onSuccess() {
      toast.success('You have created order successfully')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  return (
    <Modal
      title='Add Order'
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key='back' onClick={handleOk}>
          OK
        </Button>,
      ]}>
      <Form layout='vertical'>
        <Select
          onChange={handleChange}
          placeholder='Choose package'
          options={listPackages?.data.items.map((item: any) => ({
            value: item.uuid,
            label: item.name,
          }))}
          style={{
            minWidth: 300,
            marginRight: 16,
          }}
        />
        <Button loading={addOrderMutate.isLoading} type='primary' onClick={handleChangeAdd}>
          Create order
        </Button>
      </Form>
    </Modal>
  )
}
