import { userActions } from 'store/UserSlice'
import { selectUserProfile } from 'store/UserSlice/selector'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { getUserDetail } from 'services/authServices'

import AssignmentManagementRoutes from './AssignmentsManagement'
import CoursesRoutes from './Courses'
import DashboardPage from './Dashboard'
import EditAccountInfoPage from './EditAccountInfo'
import FilesManagementRoutes from './FilesManagement'
import OrdersRoutes from './Orders'
import PackagesRoutes from './Packages'
import PaymentRoutes from './Payment'
import SystemRoutes from './System'
import UserRoutes from './User'
import UsersManagementRoutes from './UsersManagement'

const AdminRoutes = (): JSX.Element => {
  const userData = useSelector(selectUserProfile)
  const dispatch = useDispatch()

  useEffect(() => {
    getUserDetail().then(data => {
      dispatch(userActions.userLogIn(data.data))
    })
  }, [])

  return (
    <Routes>
      <Route path='/' element={<DashboardPage />} />
      <Route path='/dashboard' element={<DashboardPage />} />
      <Route path='/edit-account-info/*' element={<EditAccountInfoPage />} />
      <Route path='/files-management/*' element={<FilesManagementRoutes />} />

      {userData.roles.find((x: any) => x.name === 'Super Administrator') ? (
        <>
          <Route path='/users-management/*' element={<UsersManagementRoutes />} />
          <Route path='/system/*' element={<SystemRoutes />} />
          <Route path='/user/*' element={<UserRoutes />} />
          <Route path='/packages/*' element={<PackagesRoutes />} />
          <Route path='/orders/*' element={<OrdersRoutes />} />
          <Route path='/courses/*' element={<CoursesRoutes />} />
          <Route path='/payment/*' element={<PaymentRoutes />} />
          <Route path='/assignments-management/*' element={<AssignmentManagementRoutes />} />
        </>
      ) : (
        userData.roles.find((x: any) => x.name === 'Accountant') && (
          <>
            <Route path='/orders/*' element={<OrdersRoutes />} />
            <Route path='/payment/*' element={<PaymentRoutes />} />
          </>
        )
      )}

      <Route path='*' element={<>NOT FOUND</>} />
    </Routes>
  )
}

export default AdminRoutes
