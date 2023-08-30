/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VITE_API_ENDPOINT as ENDPOINT } from 'constants/endPoint'

import httpRequest from './httpRequest'

const errorCancelled = ({
  order_uuid,
  transaction_uuid,
}: {
  order_uuid: string
  transaction_uuid: string | number
}): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/orders/${order_uuid}/transactions/${transaction_uuid}/cancel`,
  }

  return httpRequest.post(obj)
}

const errorComplete = ({
    order_uuid,
    transaction_uuid,
  }: {
    order_uuid: string
    transaction_uuid: string | number
  }): Promise<any> => {
    const obj = {
      url: `${ENDPOINT}/orders/${order_uuid}/transactions/${transaction_uuid}/complete`,
    }
  
    return httpRequest.post(obj)
  }

export { errorCancelled, errorComplete }
