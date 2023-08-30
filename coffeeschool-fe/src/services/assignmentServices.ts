/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VITE_API_ENDPOINT as ENDPOINT } from 'constants/endPoint'

import httpRequest from './httpRequest'

const getAssignments = (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/moodle/assignments`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const getAssignmentsDetail = (id: string): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/moodle/assignments/${id}`,
  }

  return httpRequest.get(obj)
}

const createAssignments = (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/moodle/assignments`,
    options: params,
  }

  return httpRequest.post(obj)
}

const getAssignmentItems = (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/moodle/assignment-items`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const getAssignmentItemDetail = (id: string): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/moodle/assignment-items/${id}`,
  }

  return httpRequest.get(obj)
}

const createAssignmentItem = (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/moodle/assignment-items`,
    options: params,
  }

  return httpRequest.post(obj)
}

export {
  getAssignments,
  getAssignmentsDetail,
  createAssignments,
  getAssignmentItems,
  getAssignmentItemDetail,
  createAssignmentItem,
}
