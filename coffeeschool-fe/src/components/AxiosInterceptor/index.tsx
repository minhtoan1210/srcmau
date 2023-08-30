import axios, { AxiosResponse } from 'axios'
import { userActions } from 'store/UserSlice'
import { store } from 'store/index'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: JSX.Element
}

let x: any = null

axios.interceptors.request.use(
  (requestConfig: any) => {
    const token: string | null = localStorage.getItem('access_token')

    if (token) {
      if (requestConfig.headers) {
        requestConfig.headers.Authorization = `Bearer ${token}`
      }
    }

    return requestConfig
  },
  requestError => {
    return Promise.reject(requestError)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.status === 401) {
      //
      // store.subscribe('')
      // console.error({store})
      x && x()

      store.dispatch(userActions.userLogOut())
    }

    return Promise.reject(error)
  }
)

const AxiosInterceptor = ({ children }: Props): JSX.Element => {
  const navigate = useNavigate()

  const logOutHandler = (): void => {
    userActions.userLogOut()
  }

  x = () => {
    navigate('/management/login')
  }

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse): any => {
      return response
    }

    const errInterceptor = (error: any): any => {
      if (error.response.status === 401) {
        logOutHandler()
      }

      return Promise.reject(error)
    }

    axios.interceptors.response.use(resInterceptor, errInterceptor)
  }, [])

  return children
}

export { AxiosInterceptor }
