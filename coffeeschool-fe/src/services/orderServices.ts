/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VITE_API_ENDPOINT as ENDPOINT } from 'constants/endPoint'

import httpRequest from './httpRequest'

const getOrders = async (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/orders`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const portOrders = async (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/orders`,
    options: params,
  }

  return httpRequest.post(obj)
}

const portOrdersItem = async (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/orders/${params.order_uuid}/items`,
    options: {
      product_uuid: params.product_uuid,
      product_name: params.product_name,
      product_code: params.product_code,
      product_price: params.product_price,
    },
  }

  return httpRequest.post(obj)
}

const portTransactions = async (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/orders/${params.uuid}/transactions`,
  }

  return httpRequest.post(obj)
}

const getOrdersDetail = async (id: string): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/orders/${id}`,
  }

  return httpRequest.get(obj)
}

const createOrders = ({
  user_uuid,
  package_uuid,
}: {
  user_uuid: string
  package_uuid: string | number
}): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/orders/${user_uuid}/${package_uuid}`,
  }

  return httpRequest.post(obj)
}


const updateOrders = async (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/orders/${params.uuid}`,
    options: params,
  }

  return httpRequest.put(obj)
}

const deleteOrders = async (id: string): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/orders/${id}`,
  }

  return httpRequest.delete(obj)
}

const listTransactions = async (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/payment-providers`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const createTransaction = async (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/payment/${params.uuid}`,
    options: params,
  }

  return httpRequest.post(obj)
}

const getOrderTransactions = async (params: any, uuid: string): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/orders/${uuid}/transactions`,
    options: { params },
  }

  return httpRequest.get(obj)
}

export {
  getOrders,
  getOrdersDetail,
  deleteOrders,
  createOrders,
  updateOrders,
  createTransaction,
  listTransactions,
  getOrderTransactions,
  portOrders,
  portOrdersItem,
  portTransactions,
}
