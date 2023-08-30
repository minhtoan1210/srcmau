import React from 'react'

import { Button, Result } from 'antd'

function Error401(): JSX.Element {
  return (
    <div className='gx-page-error-container'>
      <Result
        title='401'
        subTitle='Unauthorized.'
        extra={<Button type='primary'>Go back</Button>}
      />
    </div>
  )
}

export default Error401
