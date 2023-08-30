import { useNavigate } from 'react-router-dom'

import { Button, Card, Space } from 'antd'
import Tooltip from 'antd/es/tooltip'

import { ArrowLeftOutlined } from '@ant-design/icons'

import CoursesFormAdd from '../../components/FormAdd'

export default function CoursesAddPage(): JSX.Element {
  const navigate = useNavigate()

  return (
    <Card
      title={
        <>
          <Space>
            <Tooltip title='Go Back'>
              <Button
                style={{ color: 'black' }}
                onClick={() => navigate(-1)}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; Edit Courses
        </>
      }>
      <CoursesFormAdd />
    </Card>
  )
}
