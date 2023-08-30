/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VITE_API_ENDPOINT as ENDPOINT } from 'constants/endPoint'

import httpRequest from './httpRequest'

const getCategories = (params?: any): any => {
  const obj = {
    url: `${ENDPOINT}/property-categories`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const getCategoriesDetail = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/property-categories/${id}`,
  }

  return httpRequest.get(obj)
}

const createCategories = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/property-categories`,
    options: params,
  }

  return httpRequest.post(obj)
}

const updateCategories = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/property-categories/${params.uuid}`,
    options: params,
  }

  return httpRequest.put(obj)
}

const publishCategory = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/property-categories/${params.uuid}/publish`,
    options: params,
  }

  return httpRequest.put(obj)
}

const deleteCategories = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/property-categories/${id}`,
  }

  return httpRequest.delete(obj)
}

const getProperties = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/properties`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const getPropertiesDetail = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/properties/${id}`,
  }

  return httpRequest.get(obj)
}

const createProperties = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/properties`,
    options: params,
  }

  return httpRequest.post(obj)
}

const updateProperties = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/properties/${params.uuid}`,
    options: params,
  }

  return httpRequest.put(obj)
}

const publishProperty = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/properties/${params.uuid}/publish`,
    options: params,
  }

  return httpRequest.put(obj)
}

const deleteProperties = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/properties/${id}`,
  }

  return httpRequest.delete(obj)
}

const getUser = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/users`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const getPortfolios = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/portfolios`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const getPortfolioDetail = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/portfolios/${id}`,
  }

  return httpRequest.get(obj)
}

const getUserDetail = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/users/${id}`,
  }

  return httpRequest.get(obj)
}

const updateUserInfo = (params: { id?: string | null; dataToSubmit: any }): any => {
  const obj = {
    url: `${ENDPOINT}/users/${params.id}`,
    options: { ...params.dataToSubmit },
  }

  return httpRequest.put(obj)
}

const updateUserProperties = (params: { id?: string | null; dataToSubmit: any }): any => {
  const obj = {
    url: `${ENDPOINT}/users/${params.id}/properties`,
    options: { ...params.dataToSubmit },
  }

  return httpRequest.put(obj)
}

const updateUserSkills = (params: { id?: string | null; dataToSubmit: any }): any => {
  const obj = {
    url: `${ENDPOINT}/users/${params.id}/skills`,
    options: { ...params.dataToSubmit },
  }

  return httpRequest.put(obj)
}

const updateUserHobbies = (params: { id?: string | null; dataToSubmit: any }): any => {
  const obj = {
    url: `${ENDPOINT}/users/${params.id}/hobbies`,
    options: { ...params.dataToSubmit },
  }

  return httpRequest.put(obj)
}

const updateUserAddress = (params: { id?: string | null; dataToSubmit: any }): any => {
  const obj = {
    url: `${ENDPOINT}/users/${params.id}/address`,
    options: { ...params.dataToSubmit },
  }

  return httpRequest.put(obj)
}

const updateUserTimelines = (params: { id?: string | null; dataToSubmit: any }): any => {
  const obj = {
    url: `${ENDPOINT}/users/${params.id}/timelines`,
    options: { ...params.dataToSubmit },
  }

  return httpRequest.put(obj)
}

const updateUserRoles = (params: { id?: string | null; dataToSubmit: any }): any => {
  const obj = {
    url: `${ENDPOINT}/users/${params.id}/roles`,
    options: { ...params.dataToSubmit },
  }

  return httpRequest.put(obj)
}

const updateAvatar = ({ formData, id }: { id?: string | null; formData: any }): any => {
  const obj = {
    url: `${ENDPOINT}/users/${id}/avatar`,
    options: formData,
  }
  return httpRequest.post(obj)
}

const uploadUserFiles = ({ formData, id }: { id?: string | null; formData: any }): any => {
  const obj = {
    url: `${ENDPOINT}/users/${id}/files`,
    options: formData,
  }
  return httpRequest.post(obj)
}

const getUserFiles = async (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/users/${params.id}/files`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const getFiles = async (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/files`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const updateFiles = (params: { id?: string | null; dataToSubmit: any }): any => {
  const obj = {
    url: `${ENDPOINT}/files/${params.id}`,
    options: { ...params.dataToSubmit },
  }

  return httpRequest.put(obj)
}

const publicFile = (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/files/${params.uuid}/publish`,
    options: params,
  }

  return httpRequest.put(obj)
}

const deleteFile = async (file_uuid: string): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/files/${file_uuid}`,
  }

  return httpRequest.delete(obj)
}

const getUserFileDetail = async ({
  id,
  file_uuid,
}: {
  id?: string | null
  file_uuid: string
}): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/users/${id}/files/${file_uuid}`,
  }

  return httpRequest.get(obj)
}

const deleteUserFile = async ({
  id,
  file_uuid,
}: {
  id?: string | null
  file_uuid: string
}): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/users/${id}/files/${file_uuid}`,
  }

  return httpRequest.delete(obj)
}

const getUsers = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/users`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const createUsers = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/users`,
    options: params,
  }

  return httpRequest.post(obj)
}

const getFileCollections = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/file-collections`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const createFileCollection = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/file-collections`,
    options: params,
  }

  return httpRequest.post(obj)
}

const updateFileCollection = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/file-collections/${params.uuid}`,
    options: params,
  }

  return httpRequest.put(obj)
}

const getFileCollectionDetail = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/file-collections/${id}`,
  }

  return httpRequest.get(obj)
}

const deleteFileCollection = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/file-collections/${id}`,
  }

  return httpRequest.delete(obj)
}

const requestResetPassword = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/forgot-password`,
    options: params,
  }

  return httpRequest.post(obj)
}

const resetPassword = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/reset-password/${params.token}`,
    options: params,
  }

  return httpRequest.post(obj)
}

const adminChangePassword = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/users/${params.uuid}/change-password`,
    options: params,
  }

  return httpRequest.put(obj)
}

const getWork = (): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/titles`,
  }

  return httpRequest.get(obj)
}

const getSearch = (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/portfolios`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const updateVerifyDownload = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/portfolios/${params}/verifyDownload`,
    options: params,
  }

  return httpRequest.put(obj)
}

const updateVerifyDownloadUser = (id: string): any => {
  const obj = {
    url: `${ENDPOINT}/portfolios/${id}/pdf`,
  }

  return httpRequest.get(obj)
}

const getShowFile = (uuid: string): any => {
  const obj = {
    url: `${ENDPOINT}/files/${uuid}/preview`,
  }

  return httpRequest.getFileResponse(obj)
}

const getIcons = (): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/icons`,
  }

  return httpRequest.get(obj)
}

const getSetting = (): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/settings`,
  }

  return httpRequest.get(obj)
}

const gradeUser = (params: any): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/moodle/assignments/${params.assignment_uuid}/users/${params.user_uuid}`,
    options: params,
  }

  return httpRequest.post(obj)
}

const getUserEvents = (params: any): any => {
  const obj = {
    url: `${ENDPOINT}/events`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const getMyEvents = (params: any, user_uuid: string): any => {
  const obj = {
    url: `${ENDPOINT}/users/${user_uuid}/events`,
    options: { params },
  }

  return httpRequest.get(obj)
}

export {
  getCategories,
  getCategoriesDetail,
  deleteCategories,
  createCategories,
  updateCategories,
  getProperties,
  getPropertiesDetail,
  createProperties,
  updateProperties,
  deleteProperties,
  getUser,
  getUserDetail,
  getPortfolios,
  getPortfolioDetail,
  updateUserProperties,
  updateUserSkills,
  updateAvatar,
  getUsers,
  updateUserRoles,
  createUsers,
  updateUserHobbies,
  updateUserAddress,
  updateUserTimelines,
  uploadUserFiles,
  getFileCollections,
  updateUserInfo,
  publishCategory,
  publishProperty,
  createFileCollection,
  updateFileCollection,
  getFileCollectionDetail,
  deleteFileCollection,
  requestResetPassword,
  resetPassword,
  getWork,
  getSearch,
  getUserFiles,
  getUserFileDetail,
  deleteUserFile,
  getFiles,
  deleteFile,
  updateVerifyDownload,
  getIcons,
  updateFiles,
  getSetting,
  adminChangePassword,
  gradeUser,
  updateVerifyDownloadUser,
  getUserEvents,
  publicFile,
  getShowFile,
  getMyEvents,
}
