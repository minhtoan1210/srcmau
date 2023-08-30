/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VITE_API_ENDPOINT as ENDPOINT } from 'constants/endPoint'

import httpRequest from './httpRequest'

const getPermissions = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/permissions`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const getPermissionsDetail = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/permissions/${id}`,
  }

  return httpRequest.get(obj)
}

const createPermissions = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/permissions`,
    options: params,
  }

  return httpRequest.post(obj)
}

const updatePermissions = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/permissions/${params.id}`,
    options: params,
  }

  return httpRequest.put(obj)
}

const deletePermissions = (id: number | string): any => {
  const obj = {
    url: `${ENDPOINT}/permissions/${id}`,
  }

  return httpRequest.delete(obj)
}

const getRoles = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/roles`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const getRolesDetail = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/roles/${id}`,
  }

  return httpRequest.get(obj)
}

const createRoles = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/roles`,
    options: params,
  }

  return httpRequest.post(obj)
}

const updateRoles = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/roles/${params.uuid}`,
    options: params,
  }

  return httpRequest.put(obj)
}

const deleteRoles = (id: number | string): any => {
  const obj = {
    url: `${ENDPOINT}/roles/${id}`,
  }

  return httpRequest.delete(obj)
}

export {
  getPermissions,
  getPermissionsDetail,
  deletePermissions,
  createPermissions,
  updatePermissions,
  getRolesDetail,
  createRoles,
  updateRoles,
  deleteRoles,
  getRoles,
}
