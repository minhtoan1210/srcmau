import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { CategoryType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { createCategories } from 'services/userServices'

import CategoriesFormAddEdit from '../../components/FormAddEdit'

export default function CategoriesAddPage(): JSX.Element {
  const navigate = useNavigate()

  const createCategoriesMutation = useMutation(createCategories, {
    onSuccess: () => {
      toast.success('Created')
      navigate('/management/user/categories')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const onSubmitHandler = (data: CategoryType): void => {
    createCategoriesMutation.mutate(data)
  }

  return (
    <Card
      title={
        <>
          <Space>
            <Tooltip title='Go Back'>
              <Button
                style={{ color: 'black' }}
                onClick={() => navigate('/management/user/categories')}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; Add Categories
        </>
      }>
      <CategoriesFormAddEdit
        onSubmitHandler={onSubmitHandler}
        isUpdating={createCategoriesMutation.isLoading}
      />
    </Card>
  )
}
