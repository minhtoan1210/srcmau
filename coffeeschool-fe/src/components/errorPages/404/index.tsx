import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'antd'

import { SearchOutlined } from '@ant-design/icons'

function Error404(): JSX.Element {
  return (
    <div className='gx-page-error-container'>
      <div className='gx-page-error-content'>
        <div className='gx-error-code gx-mb-4'>404</div>
        <h2 className='gx-text-center'>extraPages.404Msg</h2>
        <form className='gx-mb-4' role='search'>
          <div className='gx-search-bar'>
            <div className='gx-form-group'>
              <input type='search' className='ant-input ant-input-lg' placeholder='Search...' />
              <Button type='primary' icon={<SearchOutlined />} />
            </div>
          </div>
        </form>
        <p className='gx-text-center'>
          <Link className='gx-btn gx-btn-primary' to='/'>
            extraPages.goHome
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Error404
