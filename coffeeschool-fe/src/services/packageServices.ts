/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VITE_API_ENDPOINT as ENDPOINT } from 'constants/endPoint'

import httpRequest from './httpRequest'

const getPackages = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/packages`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const getSettingGroupHome = () => {
  const obj = {
    url: `${ENDPOINT}/settings?group=home`,
  }

  return httpRequest.get(obj)
}

const getPackagesNew = () => {
  const obj = {
    url: `${ENDPOINT}/packages`,
  }

  return httpRequest.get(obj)
}


const getPackagesDetail = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/packages/${id}`,
  }

  return httpRequest.get(obj)
}

const createPackages = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/packages`,
    options: params,
  }

  return httpRequest.post(obj)
}

const updatePackages = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/packages/${params.uuid}`,
    options: params,
  }

  return httpRequest.put(obj)
}

const publishHobby = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/packages/${params.uuid}/publish`,
    options: params,
  }

  return httpRequest.put(obj)
}

const deletePackages = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/packages/${id}`,
  }

  return httpRequest.delete(obj)
}

export {
  getPackages,
  getPackagesDetail,
  deletePackages,
  createPackages,
  updatePackages,
  publishHobby,
  getPackagesNew,
  getSettingGroupHome
}
