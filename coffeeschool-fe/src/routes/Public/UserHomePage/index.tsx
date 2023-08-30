import { selectUserSetting } from 'store/UserSetting/selector'

import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { pickBy } from 'lodash'

import { getPortfolios } from 'services/userServices'

import { searchParamsToObject } from 'utils/index'

import StudentList from './components/StudentList'
import Tools from './components/Tools'
import './css/Tools.css'

export type PortfoliosQueryType = {
  city_uuid?: string
  district_uuid?: string
  ward_uuid?: string
  search?: string
  'searchIn[]'?: string[]
  'title_uuids[]'?: string[]
  'where[open_to_work]'?: number
  per_page?: number
  page?: number
}

export default function UserHomePage(): JSX.Element {
  const { items } = useSelector(selectUserSetting)

  const [searchParams, setSearchParams] = useSearchParams()

  const [queryParams, setQueryParams] = useState<PortfoliosQueryType>()

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery(
    ['getPortfolios', queryParams],
    () => {
      if (queryParams) {
        return getPortfolios(queryParams)
      }
    }
  )

  useEffect(() => {
    const searchParamsObject = searchParamsToObject(searchParams)

    const newPage = +searchParamsObject.page
    const newPerPage = +searchParamsObject.per_page
    const newIsOpenToWork = +searchParamsObject['where[open_to_work]']

    setQueryParams({
      ...searchParamsObject,
      'searchIn[]': ['name'],
      'where[open_to_work]': !isNaN(newIsOpenToWork) ? newIsOpenToWork : 0,
      page: !isNaN(newPage) ? newPage || 1 : 1,
      per_page: !isNaN(newPerPage) ? newPerPage || items[0]?.value : 5,
    })
  }, [])

  useEffect(() => {
    if (queryParams) {
      setSearchParams(
        {
          ...pickBy(queryParams),
          page: String(queryParams?.page),
          per_page: String(queryParams?.per_page),
          'where[open_to_work]': queryParams['where[open_to_work]'] ? '1' : '0',
        },
        { replace: true }
      )
    }
  }, [queryParams])

  if (!localStorage.getItem('access_token')) {
    localStorage.setItem('navigation_login', location.pathname)
  }

  return (
    <main className='main-content sticky-parent'>
      <Tools queryParams={queryParams} setQueryParams={setQueryParams} />
      <StudentList
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        categoriesData={categoriesData}
        isLoadingCategories={isLoadingCategories}
      />
    </main>
  )
}
