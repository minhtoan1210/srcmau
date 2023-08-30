/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VITE_API_ENDPOINT as ENDPOINT } from 'constants/endPoint'

import httpRequest from './httpRequest'

const getEvents = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/user-timeline-events`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const getEventsDetail = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/user-timeline-events/${id}`,
  }

  return httpRequest.get(obj)
}

const createEvents = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/user-timeline-events`,
    options: params,
  }

  return httpRequest.post(obj)
}

const updateEvents = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/user-timeline-events/${params.uuid}`,
    options: params,
  }

  return httpRequest.put(obj)
}

const publishEvent = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/user-timeline-events/${params.uuid}/publish`,
    options: params,
  }

  return httpRequest.put(obj)
}

const deleteEvents = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/user-timeline-events/${id}`,
  }

  return httpRequest.delete(obj)
}

export { getEvents, getEventsDetail, deleteEvents, createEvents, updateEvents, publishEvent }
