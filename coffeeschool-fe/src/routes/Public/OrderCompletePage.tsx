import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { errorComplete } from 'services/errorServices'

import './style.css'

export default function OrderCompletePage(): JSX.Element {
  const [status, setStatus] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    complete.mutate({
      order_uuid: `${localStorage.getItem('Orders_uuid')}`,
      transaction_uuid: `${localStorage.getItem('Transactions_uuid')}`,
    })
  }, [])

  const complete = useMutation(errorComplete, {
    onSuccess(res: any) {
      setStatus(res.data.data.properties.state)
      setLoading(false)
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
    setLoading(false)
    localStorage.removeItem('Orders_uuid')
    localStorage.removeItem('Transactions_uuid')
  }, [status])

  return (
    <>
      {loading ? (
        <div className='loading_center'>
          <div className='loading_center-ring' />
          <span className='center-ring'>loading...</span>
        </div>
      ) : (
        <>
          {status === 'COMPLETED' ? (
            <div className='success' style={{ textAlign: 'center', paddingTop: '20px' }}>
              <img
                src='/assets/completed.png'
                alt=''
                style={{ width: '100px', height: '100px', marginBottom: '20px' }}
              />
              <div className='title-success' style={{ marginBottom: '20px' }}>
                Chúc mừng! Bạn đã thanh toán thành công.
              </div>
              <Link to='/' className='ant-btn ant-btn-primary'>
                Đồng ý
              </Link>
            </div>
          ) : (
            <div className='success' style={{ textAlign: 'center', paddingTop: '20px' }}>
              <img
                src='/assets/erorrprices.png'
                alt=''
                style={{ width: '100px', height: '100px', marginBottom: '20px' }}
              />
              <div className='title-success' style={{ marginBottom: '20px' }}>
                Xin lỗi! Thanh toán không thành công.
                <br />
                Vui lòng thử lại sau!
              </div>
              <Link to='/' className='ant-btn ant-btn-primary'>
                Đồng ý
              </Link>
            </div>
          )}
        </>
      )}
    </>
  )
}
