import { selectUserSetting } from 'store/UserSetting/selector'
import { v4 as uuidv4 } from 'uuid'

import { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'

import { AutoComplete, Button, Input } from 'antd'
import { Checkbox } from 'antd'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'

import { AddressType } from 'types'

import { getCities, getDistricts, getWards } from 'services/addressServices'
import { getWork } from 'services/userServices'

import { PortfoliosQueryType } from '../..'

interface Props {
  data?: AddressType
  queryParams?: PortfoliosQueryType
  setQueryParams: React.Dispatch<React.SetStateAction<PortfoliosQueryType | undefined>>
}

export default function Tools({ queryParams, setQueryParams }: Props): JSX.Element {
  const { items } = useSelector(selectUserSetting)

  const [citydata, setCityData] = useState<any>([])
  const [nameCity, setNameCity] = useState()

  const [nameDistrict, setNameDistrict] = useState()

  const [nameWard, setNameWard] = useState()

  const [titles, setTitles] = useState<any[]>([])

  const inputName = useRef<HTMLInputElement>(null)

  const { data: wardData } = useQuery(
    ['getWard', queryParams?.district_uuid],
    () => {
      if (queryParams?.district_uuid) {
        return getWards(queryParams.district_uuid)
      }
    },
    {
      onSuccess(data) {
        if (data) {
          const wardDetail = data.data.items.find((x: any) => x.uuid === queryParams?.ward_uuid)

          if (wardDetail) {
            setNameWard(wardDetail.name)
          } else {
            setNameWard(undefined)

            setQueryParams(oldState => {
              return { ...oldState, ward_uuid: undefined, page: 1 }
            })
          }
        }
      },
    }
  )

  useQuery('getCities', getCities, {
    onSuccess({ data }) {
      if (data) {
        setCityData(data.items)

        const cityDetail = data.items.find((x: any) => x.uuid === queryParams?.city_uuid)

        if (cityDetail) {
          setNameCity(cityDetail.name)
        } else {
          setNameCity(undefined)
          setQueryParams(oldState => {
            return { ...oldState, city_uuid: undefined, page: 1 }
          })
        }
      }
    },
  })

  const { data: districtData } = useQuery(['getDistrict', queryParams?.city_uuid], () => {
    if (queryParams?.city_uuid) {
      return getDistricts(queryParams?.city_uuid)
    }
  })

  const { data: dataWork } = useQuery('getWork', getWork)

  useEffect(() => {
    if (dataWork) {
      setTitles(dataWork.data.items)
    }
  }, [dataWork])

  const onChangCity = (x: any, value: any) => {
    if (value.label === queryParams?.city_uuid) {
      return
    }

    setNameCity(value.label)
    setQueryParams({ ...queryParams, city_uuid: value.value, page: 1 })

    setNameDistrict(undefined)
    setNameWard(undefined)
  }

  const onChangDistrict = (_: any, value: any) => {
    if (value.value === queryParams?.district_uuid) {
      return
    }

    setNameDistrict(value.label)

    setQueryParams({ ...queryParams, district_uuid: value.value, page: 1 })

    setNameWard(undefined)
  }

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setQueryParams({ ...queryParams, 'title_uuids[]': checkedValues as string[], page: 1 })
  }

  const handleCLickSearch = (e: any) => {
    setQueryParams({ ...queryParams, search: inputName.current?.value, page: 1 })
    e.preventDefault()
  }

  const handleCLickReset = () => {
    if (inputName.current) {
      inputName.current.value = ''
    }

    setQueryParams({
      per_page: queryParams && queryParams.per_page,
      page: 1,
      'searchIn[]': queryParams && queryParams['searchIn[]'],
    })

    setNameCity(undefined)
    setNameDistrict(undefined)
    setNameWard(undefined)
  }

  return (
    <aside className='tools aside selecthome'>
      <div className='background-sreach'>
        <form className='search-form'>
          <div className='search-bar'>
            <input
              type='text'
              placeholder='Nhập từ khóa tìm kiếm'
              autoComplete='off'
              className='form-control txt-field'
              style={{ cursor: 'auto' }}
              ref={inputName}
              defaultValue={queryParams?.search}
            />
            <button className='search-button' onClick={handleCLickSearch}>
              <img src='./assets/sreach.svg' alt='' />
            </button>
          </div>
          <h4 className='filter-header'>Lọc hồ sơ theo khu vực</h4>
          <div className='dropdown location'>
            {items?.map((value: any) => (
              <div key={uuidv4()}>
                {value.value === '1' && value.key === 'filter_by_cities' && (
                  <div className='custom-select'>
                    <div className='custom-select-icon' />
                    <span
                      style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        position: 'relative',
                        height: '33px',
                        marginBottom: '16px',
                      }}>
                      <AutoComplete
                        notFoundContent=' '
                        value={nameCity}
                        onChange={onChangCity}
                        filterOption={(inputValue, option) =>
                          option!.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        options={citydata.map((x: any) => ({
                          value: x?.uuid,
                          label: x?.name,
                        }))}>
                        <Input.Search placeholder='Chọn Thành Phố / Tỉnh' />
                      </AutoComplete>
                    </span>
                  </div>
                )}
                {value.value === '1' && value.key === 'filter_by_districts' && (
                  <div className='custom-select'>
                    <div className='custom-select-icon' />
                    <span
                      style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        position: 'relative',
                        height: '33px',
                        marginBottom: '16px',
                      }}>
                      <AutoComplete
                        value={nameDistrict}
                        disabled={!nameCity}
                        notFoundContent=' '
                        onChange={onChangDistrict}
                        filterOption={(inputValue, option) =>
                          option!.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        options={districtData?.data.items.map((x: any) => ({
                          value: x.uuid,
                          label: x.name,
                        }))}>
                        <Input.Search placeholder='Chọn Huyện / Xã' />
                      </AutoComplete>
                    </span>
                  </div>
                )}
                {value.value === '1' && value.key === 'filter_by_wards' && (
                  <div className='custom-select'>
                    <div className='custom-select-icon' />
                    <span
                      style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        position: 'relative',
                        height: '33px',
                        marginBottom: '16px',
                      }}>
                      <AutoComplete
                        notFoundContent=' '
                        value={nameWard}
                        disabled={!nameDistrict}
                        onChange={(_, value: any) => {
                          setNameWard(value.label)
                          setQueryParams({ ...queryParams, ward_uuid: value.value, page: 1 })
                        }}
                        filterOption={(inputValue, option) =>
                          option!.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        options={wardData?.data.items.map((x: any) => ({
                          value: x.uuid,
                          label: x.name,
                        }))}>
                        <Input.Search placeholder='Chọn Xã / Thị Trấn' />
                      </AutoComplete>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </form>
        <div className='filter-status'>
          <h4 className='filter-status_title'>Lọc Hồ sơ theo trạng thái</h4>
          <Checkbox
            checked={!!queryParams?.['where[open_to_work]']}
            onChange={e =>
              setQueryParams({ ...queryParams, 'where[open_to_work]': +e.target.checked, page: 1 })
            }>
            Đi làm ngay
          </Checkbox>
        </div>
        <div className='filter'>
          <div className='filter-box'>
            <h4 className='filter-header'>Lọc hồ sơ theo vị trí công việc</h4>
            <div className='filter-group'>
              <Checkbox.Group
                options={titles.map((data: { name: string; uuid: string }) => ({
                  label: data.name,
                  value: data.uuid,
                }))}
                value={queryParams?.['title_uuids[]']}
                onChange={onChange}
              />
            </div>
            <Button
              type='primary'
              onClick={handleCLickReset}
              style={{ width: '100%', marginTop: 20 }}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}
