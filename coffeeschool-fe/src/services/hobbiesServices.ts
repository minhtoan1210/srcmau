/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VITE_API_ENDPOINT as ENDPOINT } from 'constants/endPoint'

import httpRequest from './httpRequest'

const getHobbies = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/hobbies`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const getHobbiesDetail = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/hobbies/${id}`,
  }

  return httpRequest.get(obj)
}

const createHobbies = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/hobbies`,
    options: params,
  }

  return httpRequest.post(obj)
}

const updateHobbies = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/hobbies/${params.uuid}`,
    options: params,
  }

  return httpRequest.put(obj)
}

const publishHobby = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/hobbies/${params.uuid}/publish`,
    options: params,
  }

  return httpRequest.put(obj)
}

const deleteHobbies = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/hobbies/${id}`,
  }

  return httpRequest.delete(obj)
}

export { getHobbies, getHobbiesDetail, deleteHobbies, createHobbies, updateHobbies, publishHobby }
