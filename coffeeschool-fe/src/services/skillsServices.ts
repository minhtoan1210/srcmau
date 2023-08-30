/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VITE_API_ENDPOINT as ENDPOINT } from 'constants/endPoint'

import httpRequest from './httpRequest'

const getSkills = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/skills`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const getSkillsDetail = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/skills/${id}`,
  }

  return httpRequest.get(obj)
}

const createSkills = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/skills`,
    options: params,
  }

  return httpRequest.post(obj)
}

const updateSkills = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/skills/${params.uuid}`,
    options: params,
  }

  return httpRequest.put(obj)
}

const publishSkill = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/skills/${params.uuid}/publish`,
    options: params,
  }

  return httpRequest.put(obj)
}

const deleteSkills = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/skills/${id}`,
  }

  return httpRequest.delete(obj)
}

export { getSkills, getSkillsDetail, deleteSkills, createSkills, updateSkills, publishSkill }
