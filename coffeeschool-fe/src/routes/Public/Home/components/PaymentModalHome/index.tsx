
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import { Button, Checkbox, Form, Input, InputNumber, Modal, Radio, Select } from 'antd'

import {
  portOrders,
  portOrdersItem,
  portTransactions,
} from 'services/orderServices'

import './style.css'

interface Props {
  isOpen?: boolean
  handleOk: () => void
  handleCancel: () => void
  loading?: boolean
  idModalPackage: string | undefined
  price: string | undefined
  dataPackages: any
  setIsLoading?: any
  PackageItem: any
}

export default function PaymentModalHome({
  isOpen,
  handleCancel,
  handleOk,
  price,
  dataPackages,
  setIsLoading,
  PackageItem,
}: Props): JSX.Element {
  const [dataorders, setorders] = useState<any>()
  const [transactionsUuid, setTransactionsUuid] = useState<any>()
  const [valueRadio, setValueRadio] = useState(1)

  const addOrderMutate = useMutation(portOrders, {
    onSuccess(res: any) {
      setorders(res.data.data.properties.uuid)
    },
    onError: () => {},
  })

  useEffect(() => {
    if (dataorders) {
      addOrderitem.mutate({
        order_uuid: dataorders,
        product_uuid: `${PackageItem.product_uuid}`,
        product_name: `${PackageItem.product_name}`,
        product_code: 'PACKAGE',
        product_price: `${PackageItem.product_price}`,
      })
    }
  }, [dataorders])

  const addOrderitem = useMutation(portOrdersItem, {
    onSuccess(res: any) {
      setTransactionsUuid(res.data.data.properties.uuid)
    },
    onError: (error: any) => {},
  })

  const addOrderTransactions = useMutation(portTransactions, {
    onSuccess(res: any) {
      localStorage.setItem('Orders_uuid', `${transactionsUuid}`)
      localStorage.setItem('Transactions_uuid', `${res.data.data.properties.uuid}`)
      window.location.href = (`${res.data.data.properties.checkout_url}`)
      setIsLoading(true)
    },
    onError: (error: any) => {},
  })

  useEffect(() => {
    if (transactionsUuid) {
      addOrderTransactions.mutate({
        uuid: transactionsUuid,
      })
    }
  }, [transactionsUuid])

  const onFinish = (values: any) => {
    addOrderMutate.mutate({
      buyer_phone: values.user.phone || '',
      buyer_address: values.user.address || '',
    })
    setIsLoading(false)
    handleOk()
  }

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  }

  const onChangeRadio = (e: any) => {
    setValueRadio(e.target.value)
  }

  return (
    <Modal open={isOpen} className='PaymentModal'  onCancel={handleCancel}>
      <div className='form-input'>
        <Form
          name='nest-messages'
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}>
          <div className='form-inputt'>
            <div className='form-input_left'>
              <div className='form-input_left-title'>THÔNG TIN ĐƠN HÀNG</div>
              <div className='left'>
                <Form.Item name={['user', 'name']} label='Họ tên đầy đủ'>
                  <Input />
                </Form.Item>
                <Form.Item name={['user', 'email']} label='Email'>
                  <Input />
                </Form.Item>
                <Form.Item name={['user', 'phone']} label='Số điện thoại'>
                  <Input />
                </Form.Item>
                <Form.Item name={['user', 'address']} label='Địa Chỉ'>
                  <Input />
                </Form.Item>
                <Form.Item name={['user', 'note']} label='note'>
                  <Input />
                </Form.Item>
                <Form.Item
                  name={['user', 'pricse']}
                  label='Phương thức thanh toán'
                  className='method'>
                  <Radio.Group onChange={onChangeRadio} value={valueRadio}>
                    <Radio value={1}>Thanh toán tiền mặt</Radio>
                    <Radio value={2}>Thanh toán thẻ Visa, Master, JCB</Radio>
                  </Radio.Group>
                </Form.Item>
                <div className='total'>
                  <div className='total-provisional'>
                    <div className='total-provisional_text'>Tạm tính</div>
                    <div className='total-provisional_number'>{price}</div>
                  </div>
                  <div className='total-discount'>
                    <div className='total-discount_text'>Giảm giá</div>
                    <div className='total-discount_number'>0đ</div>
                  </div>
                  <div className='total-amount'>
                    <div className='total-amount_text'>Tổng tiền</div>
                    <div className='total-number'>{price}</div>
                  </div>
                </div>
                <div className='btn-input'>
                  <Form.Item>
                    <Button type='primary' onClick={handleCancel}>
                      Huỷ
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' htmlType='submit'>
                      Thanh toán
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </Form>
        {/* <div className='form-radio'>
          <div className='form-radio_title'>GÓI XEM HỒ SƠ</div>
          <div className='form-radio_item'>
            <Radio.Group
              value={price}
              onChange={onChangeRadioPrice}
              options={dataPackages?.map(
                (data: { properties: { name: string; price: string; uuid: string } }) => ({
                  label: data.properties.name + '-' + data.properties.price,
                  value: data.properties.uuid,
                })
              )}
            />
          </div>
        </div> */}
      </div>
    </Modal>
  )
}
