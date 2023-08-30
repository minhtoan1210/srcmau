import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { CategoryType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import { deleteCategories, getCategoriesDetail, updateCategories } from 'services/userServices'

import CategoriesFormAddEdit from '../../components/FormAddEdit'
import './style.scss'

export default function CategoriesEitPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading } = useQuery(['getCategoriesDetail', id], () => {
    if (id) {
      return getCategoriesDetail(id)
    }
  })

  const updateCategoriesMutation = useMutation(updateCategories, {
    onSuccess: () => {
      toast.success('Updated')
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

  const deleteMutation = useMutation(deleteCategories, {
    onSuccess: () => {
      toast.success('Deleted')
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
    data.uuid = id
    updateCategoriesMutation.mutate(data)
  }

  const onDeleteHandler = (id?: string): void => {
    if (id) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <Card
      loading={isLoading || deleteMutation.isLoading}
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
          &nbsp; Edit Categories
        </>
      }
      extra={
        <ConfirmDelete
          title='Delete'
          message={`Are you sure you want to delete user`}
          useTitle
          onClick={() => onDeleteHandler(id)}
          isLoading={false}
        />
      }>
      <CategoriesFormAddEdit
        data={data?.data}
        onSubmitHandler={onSubmitHandler}
        isUpdating={updateCategoriesMutation.isLoading}
      />
    </Card>
  )
}
