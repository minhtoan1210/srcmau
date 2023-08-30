import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { OptionType, PropertiesType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import {
  deleteProperties,
  getCategories,
  getPropertiesDetail,
  updateProperties,
} from 'services/userServices'

import PropertyFormAddEdit from '../../components/FormAddEdit'

export default function PropertiesEitPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()

  const [categoriesOptions, setCategoriesOptions] = useState<OptionType[]>([])
  const [propertyData, setPropertyData] = useState<PropertiesType>()

  const { data: categoriesData, isLoading } = useQuery(['getCategories'], () =>
    getCategories({
      per_page: 9999999,
      page: 1,
    })
  )

  const { data, isLoading: isLoadingProperty } = useQuery(['getPropertiesDetail', id], () => {
    if (id) {
      return getPropertiesDetail(id)
    }
  })

  const updateCategoriesMutation = useMutation(updateProperties, {
    onSuccess: () => {
      toast.success('Updated')
      navigate('/management/user/properties')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const deleteMutation = useMutation(deleteProperties, {
    onSuccess: () => {
      toast.success('Deleted')
      navigate('/management/user/properties')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  useEffect(() => {
    if (categoriesData) {
      const options = categoriesData.data?.items.map((item: any) => {
        return {
          value: item.uuid,
          label: item.name,
        }
      })

      setCategoriesOptions(options)
    }
  }, [categoriesData])

  useEffect(() => {
    if (data?.data) {
      const property: PropertiesType = { ...data.data, category_uuid: data.data.category.uuid }
      setPropertyData(property)
    }
  }, [data])

  const onDeleteHandler = (): void => {
    if (id) {
      deleteMutation.mutate(id)
    }
  }

  const onSubmitHandler = (data: PropertiesType): void => {
    data.uuid = id
    updateCategoriesMutation.mutate(data)
  }

  return (
    <Card
      loading={isLoadingProperty || isLoading}
      title={
        <>
          <Space>
            <Tooltip title='Go Back'>
              <Button
                style={{ color: 'black' }}
                onClick={() => navigate('/management/user/properties')}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; Edit Properties
        </>
      }
      extra={
        <ConfirmDelete
          title='Delete'
          message={`Are you sure you want to delete property`}
          useTitle
          onClick={onDeleteHandler}
          isLoading={false}
        />
      }>
      <PropertyFormAddEdit
        onSubmitHandler={onSubmitHandler}
        isUpdating={updateCategoriesMutation.isLoading}
        categoriesOptions={categoriesOptions}
        data={propertyData}
      />
    </Card>
  )
}
