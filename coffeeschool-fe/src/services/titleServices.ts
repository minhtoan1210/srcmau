/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VITE_API_ENDPOINT as ENDPOINT } from 'constants/endPoint'

import httpRequest from './httpRequest'

const getTitles = (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/titles`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const getTitleDetail = (uuid: string): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/titles/${uuid}`,
  }

  return httpRequest.get(obj)
}

const createTitle = (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/titles`,
    options: params,
  }

  return httpRequest.post(obj)
}

const updateTitle = (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/titles/${params.uuid}`,
    options: params,
  }

  return httpRequest.put(obj)
}

const deleteTitle = (uuid: string): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/titles/${uuid}`,
  }

  return httpRequest.delete(obj)
}

export { getTitles, getTitleDetail, createTitle, updateTitle, deleteTitle }
