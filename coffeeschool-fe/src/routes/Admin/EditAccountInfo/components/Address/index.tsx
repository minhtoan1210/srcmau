import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { Button, Card, Input, Select } from 'antd'

import { AddressType } from 'types'

import { getCities, getDistricts, getWards } from 'services/addressServices'

interface Props {
  loading: boolean
  updateAddress: (data: any) => void
  data?: AddressType
  isLoading?: boolean
}

export default function Address({ updateAddress, loading, data, isLoading }: Props): JSX.Element {
  const [city, setCity] = useState(data?.city_uuid || '')
  const [district, setDistrict] = useState(data?.district_uuid || '')
  const [ward, setWard] = useState(data?.ward_uuid || '')
  const [street, setStreet] = useState(data?.street || '')
  const [names, setNames] = useState({
    city_name: data?.city_name || '',
    district_name: data?.district_name || '',
    ward_name: data?.ward_name || '',
  })

  const { data: cityData } = useQuery('getCities', getCities)
  const { data: districtData } = useQuery(['getDistrict', city], () => {
    if (city) {
      return getDistricts(city)
    }
  })
  const { data: wardData } = useQuery(['getWard', district], () => {
    if (district) {
      return getWards(district)
    }
  })

  useEffect(() => {
    if (ward && wardData) {
      const wardDetail = wardData.data.items.find((x: any) => x.uuid === ward)

      if (wardDetail) {
        setNames({ ...names, ward_name: wardDetail.name })
      } else {
        setNames({ ...names, ward_name: '' })
      }
    } else {
      setNames({ ...names, ward_name: '' })
    }
  }, [ward])

  useEffect(() => {
    if (district && districtData) {
      const districtDetail = districtData.data.items.find((x: any) => x.uuid === district)

      if (districtDetail) {
        setNames({ ...names, district_name: districtDetail.name })
      } else {
        setNames({ ...names, district_name: '' })
      }
    } else {
      setNames({ ...names, district_name: '' })
    }
  }, [district])

  useEffect(() => {
    if (city && cityData) {
      const cityDetail = cityData.data.items.find((x: any) => x.uuid === city)

      if (cityDetail) {
        setNames({ ...names, city_name: cityDetail.name })
      } else {
        setNames({ ...names, city_name: '' })
      }
    } else {
      setNames({ ...names, city_name: '' })
    }
  }, [city])

  const onUpdateAddressHandler = (): void => {
    const dataToSubmit = {
      street,
      city_uuid: city,
      district_uuid: district,
      ward_uuid: ward,
    }

    updateAddress(dataToSubmit)
  }

  return (
    <Card
      loading={loading}
      title='Address'
      actions={[
        <>
          <Button loading={isLoading} onClick={onUpdateAddressHandler} type='primary'>
            Submit
          </Button>
        </>,
      ]}>
      <span style={{ display: 'flex', marginBottom: 16 }}>
        <span style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <span>City</span>
          <Select
            value={city}
            onChange={value => {
              if (value === city) {
                return
              }
              setCity(value)
              setDistrict('')
              setWard('')
            }}
            options={cityData?.data.items.map((x: any) => ({
              value: x.uuid,
              label: x.name,
            }))}
            style={{
              marginRight: 16,
            }}
          />
        </span>
        <span style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <span>District</span>
          <Select
            value={district}
            onChange={value => {
              if (value === district) {
                return
              }
              setWard('')
              setDistrict(value)
            }}
            options={districtData?.data.items.map((x: any) => ({
              value: x.uuid,
              label: x.name,
            }))}
            style={{
              marginRight: 16,
            }}
          />
        </span>
        <span style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <span>Ward</span>
          <Select
            value={ward}
            onChange={value => setWard(value)}
            options={wardData?.data.items.map((x: any) => ({
              value: x.uuid,
              label: x.name,
            }))}
          />
        </span>
      </span>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ marginRight: 8 }}>Street</span>
        <Input value={street} onChange={e => setStreet(e.target.value)} />
      </div>
    </Card>
  )
}
