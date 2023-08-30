import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { errorCancelled } from 'services/errorServices'

export default function OrderErrorPage(): JSX.Element {
  const [status, setStatus] = useState()

  useEffect(() => {
    complete.mutate({
      order_uuid: `${localStorage.getItem('Orders_uuid')}`,
      transaction_uuid: `${localStorage.getItem('Transactions_uuid')}`,
    })
  }, [])

  const complete = useMutation(errorCancelled, {
    onSuccess(res: any) {
      setStatus(res.data.data.properties.state)
    },
    onError: () => {},
  })

  useEffect(() => {
    localStorage.removeItem('Orders_uuid')
    localStorage.removeItem('Transactions_uuid')
  }, [status])
  return (
    <div className='success' style={{ textAlign: 'center', paddingTop: '20px' }}>
      <img
        src='/assets/cancelled.png'
        alt=''
        style={{ width: '100px', height: '100px', marginBottom: '20px' }}
      />
      <div className='title-success' style={{ marginBottom: '20px' }}>
      Đơn hàng đã bị huỷ!
      </div>
      <Link to='/' className='ant-btn ant-btn-primary'>
        Đồng ý
      </Link>
    </div>
  )
}
