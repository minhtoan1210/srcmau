/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VITE_API_ENDPOINT as ENDPOINT } from 'constants/endPoint'

import httpRequest from './httpRequest'

const getCities = (): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/cities`,
  }

  return httpRequest.get(obj)
}

const getDistricts = (city_uuid: string): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/districts?city_uuid=${city_uuid}`,
  }

  return httpRequest.get(obj)
}

const getWards = (district_uuid: string): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/wards?district_uuid=${district_uuid}`,
  }

  return httpRequest.get(obj)
}

export { getCities, getDistricts, getWards }
