import React from 'react'

import { Button, ButtonProps, Modal, Tooltip } from 'antd'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined'

interface ConfirmDeleteProps {
  title?: string
  useTitle?: boolean | true
  message?: string
  isLoading: boolean | false
}

function ConfirmDelete({
  useTitle,
  title,
  message,
  onClick,
  isLoading,
  danger = true,
  type = 'default',
  icon = <DeleteOutlined />,
  disabled = false,
  style,
}: ConfirmDeleteProps & ButtonProps): JSX.Element {
  const handleOnClick = (): void => {
    Modal.confirm({
      title: 'Confirmation',
      icon: <ExclamationCircleOutlined />,
      content: message,
      onOk: onClick,
    })
  }

  return (
    <Tooltip title={title}>
      <Button
        className='deleteuser'
        icon={icon}
        danger={danger}
        type={type}
        onClick={handleOnClick}
        loading={isLoading}
        disabled={disabled}
        style={{ marginRight: 0, ...style }}>
        {useTitle ? title : ''}
      </Button>
    </Tooltip>
  )
}

export default ConfirmDelete
