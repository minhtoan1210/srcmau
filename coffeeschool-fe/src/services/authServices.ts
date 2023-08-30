/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VITE_API_ENDPOINT as ENDPOINT } from 'constants/endPoint'

import httpRequest from './httpRequest'

const logIn = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/login`,
    options: params,
  }

  return httpRequest.post(obj)
}

const logOut = (): any => {
  const obj = {
    url: `${ENDPOINT}/logout`,
  }

  return httpRequest.post(obj)
}

const getUserDetail = (id?: string): Promise<any> => {
  const uuid: string | null = localStorage.getItem('user_uuid')
  const obj = {
    url: `${ENDPOINT}/users/${id || uuid}`,
  }

  if (!id && !uuid) {
    return Promise.reject()
  }

  return httpRequest.get(obj)
}

const updatePassword = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/users/${params.uuid}`,
    options: params,
  }

  return httpRequest.put(obj)
}

const deleteUser = async (id: string): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/users/${id}`,
  }

  return httpRequest.delete(obj)
}

export { logIn, logOut, getUserDetail, updatePassword, deleteUser }
