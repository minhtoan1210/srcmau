import React from 'react'
import { Link } from 'react-router-dom'

import { Button, Result } from 'antd'

function Error500(): JSX.Element {
  return (
    <div className='gx-page-error-container'>
      <Result
        status='500'
        title='500'
        subTitle={'extraPages.500Msg'}
        extra={<Button type='primary'>extraPages.goHome</Button>}
      />
      <div className='gx-page-error-content'>
        <div className='gx-error-code'>500</div>
        <h2 className='gx-text-center'>extraPages.500Msg</h2>

        <p className='gx-text-center'>
          <Link className='gx-btn gx-btn-primary' to='/'>
            extraPages.goHome
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Error500
