import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { OptionType, PropertiesType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { createProperties, getCategories } from 'services/userServices'

import PropertyFormAddEdit from '../../components/FormAddEdit'

export default function PropertiesAddPage(): JSX.Element {
  const navigate = useNavigate()
  const [categoriesOptions, setCategoriesOptions] = useState<OptionType[]>([])

  const { data: categoriesData, isLoading } = useQuery(['getCategories'], () =>
    getCategories({
      per_page: 9999999,
      page: 1,
    })
  )

  const createCategoriesMutation = useMutation(createProperties, {
    onSuccess: () => {
      toast.success('Created')
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

  const onSubmitHandler = (data: PropertiesType): void => {
    createCategoriesMutation.mutate(data)
  }

  return (
    <Card
      loading={isLoading}
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
          &nbsp; Add Property
        </>
      }>
      <PropertyFormAddEdit
        onSubmitHandler={onSubmitHandler}
        isUpdating={createCategoriesMutation.isLoading}
        categoriesOptions={categoriesOptions}
      />
    </Card>
  )
}
