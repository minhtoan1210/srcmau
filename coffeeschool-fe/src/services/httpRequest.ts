/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosResponse, CancelTokenSource } from 'axios'

const { CancelToken } = axios
const source: CancelTokenSource = CancelToken.source()

const get = async (params: any): Promise<any> => {
  const endPoint: string = params.url
  let config = params.options ? params.options : {}
  config = { ...config, cancelToken: source.token }
  const response: AxiosResponse = await axios.get(endPoint, config)
  return response.data
}

const getFileResponse = async (params: any): Promise<any> => {
  const endPoint: string = params.url
  let config = params.options
    ? params.options
    : {
        headers: {
          Accept: 'image/png',
        },
        responseType: 'blob',
      }
  config = { ...config, cancelToken: source.token }
  const response: AxiosResponse = await axios.get(endPoint, config)
  return response
}

const post = async (params: any): Promise<any> => {
  const endPoint: string = params.url
  let config = params.config ? params.config : {}
  config = { ...config, cancelToken: source.token }
  const response: AxiosResponse = await axios.post(endPoint, params.options, config)
  return response
}

const put = async (params: any): Promise<any> => {
  const endPoint: string = params.url
  let config = params.options ? params.options : {}
  config = { ...config, cancelToken: source.token }
  const response = await axios.put(endPoint, params.options, config)
  return response
}

const _delete = async (params: any): Promise<any> => {
  const endPoint: string = params.url
  let config = params.options ? params.options : {}
  config = { ...config, cancelToken: source.token }
  const response: AxiosResponse = await axios.delete(endPoint, config)
  return response
}

const patch = async (params: any): Promise<any> => {
  const endPoint: string = params.url
  let config = params.options ? params.options : {}
  config = { ...config, cancelToken: source.token }
  const response: AxiosResponse = await axios.patch(endPoint, params.options, config)
  return response
}

const httpRequest = {
  get,
  put,
  post,
  patch,
  delete: _delete,
  getFileResponse,
}

export default httpRequest
