import { useState } from 'react'
import { useQuery } from 'react-query'

import { AutoComplete, Button, Form, Input, Modal } from 'antd'
import TextArea from 'antd/lib/input/TextArea'

import { debounce } from 'lodash'

import { QueryParamsType } from 'types'

import { listTransactions } from 'services/orderServices'

interface Props {
  isOpen?: boolean
  handleOk: (data: any) => Promise<void>
  handleCancel: () => void
  loading?: boolean
}

export default function PaymentModal({
  isOpen,
  handleCancel,
  handleOk,
  loading,
}: Props): JSX.Element {
  const [form] = Form.useForm()

  const [selectedTransaction, setSelectedTransaction] = useState<{
    isCash: boolean
    payment_provider_uuid: string
  }>()
  const [paramQueryModel, setParamQueryModel] = useState<QueryParamsType>({
    page: 1,
    per_page: 20,
    orderDirection: 'desc',
    search: '',
    'searchIn[]': ['name'],
  })

  const { data: listTransactionsData } = useQuery(['getListTransactions', paramQueryModel], () =>
    listTransactions(paramQueryModel)
  )

  const searchTransactionsDebounce = debounce(value => {
    setParamQueryModel({ ...paramQueryModel, search: value })
  }, 500)

  const onOkHandler = async (): Promise<void> => {
    const validate = await form.validateFields()

    if (validate) {
      const data = form.getFieldsValue()

      await handleOk({ ...data, selectedTransaction })

      form.resetFields()
      setSelectedTransaction(undefined)
    }
  }

  const onCancelHandler = (): void => {
    form.resetFields()
    handleCancel()
    setSelectedTransaction(undefined)
  }

  return (
    <Modal
      open={isOpen}
      title='Submit pay by cash'
      onOk={onOkHandler}
      onCancel={onCancelHandler}
      footer={[
        <Button key='back' onClick={onCancelHandler}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' loading={loading} onClick={onOkHandler}>
          Submit
        </Button>,
      ]}>
      <Form form={form} layout='vertical' autoComplete='off'>
        <Form.Item
          name='payment_provider_uuid'
          label='Select payment method'
          required
          rules={[
            {
              required: true,
              message: 'Please enter select payment method!',
            },
          ]}>
          <AutoComplete
            placeholder='Choose payment method'
            allowClear
            onChange={(_, value: any) =>
              setSelectedTransaction({ payment_provider_uuid: value.uuid, isCash: value.isCash })
            }
            onSearch={(value: string) => searchTransactionsDebounce(value)}
            options={listTransactionsData?.data.items.map((item: any) => ({
              key: item.uuid,
              value: item.name,
              label: item.name,
              uuid: item.uuid,
              isCash: item.is_cash,
            }))}
          />
        </Form.Item>

        {!!selectedTransaction?.isCash && (
          <>
            <Form.Item
              name='billNumber'
              label='Bill No'
              required
              rules={[
                {
                  required: true,
                  message: 'Please enter your bill number!',
                },
              ]}>
              <Input maxLength={512} />
            </Form.Item>
            <Form.Item name='remarks' label='Remarks'>
              <TextArea maxLength={512} />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  )
}
