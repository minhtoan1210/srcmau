import { settingActions } from 'store/UserSetting'
import { userActions } from 'store/UserSlice'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { getUserDetail } from 'services/authServices'
import { getSetting } from 'services/userServices'

import ForgotPassword from './ForgotPassword'
import HomePage from './Home'
import OrderCompletePage from './OrderCompletePage'
import OrderErrorPage from './OrderErrorPage'
import PortfoliosPage from './PortfoliosPage'
import ResetPassword from './ResetPassword'
import UserHomePage from './UserHomePage'

const PublicRoutes = (): JSX.Element => {
  const dispatch = useDispatch()

  useEffect(() => {
    getUserDetail().then(data => {
      dispatch(userActions.userLogIn(data.data))
    })

    getSetting().then((data: any) => {
      dispatch(settingActions.gettingLogIn(data.data.items))
    })
  }, [])

  return (
    <div className='main-user'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/portfolios' element={<UserHomePage />} />
        <Route path='/portfolios/:id' element={<PortfoliosPage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        
        <Route path='/orders/:orderId/completed' element={<OrderCompletePage />} />
        <Route path='/orders/:orderId/cancelled' element={<OrderErrorPage />} />
      </Routes>
    </div>
  )
}

export default PublicRoutes
