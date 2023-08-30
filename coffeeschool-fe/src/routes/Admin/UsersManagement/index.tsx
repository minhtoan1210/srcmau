import { Route, Routes } from 'react-router-dom'

import UserAddPage from './pages/Add'
import UserEitPage from './pages/Edit'
import GradePage from './pages/Grade'
import UserListPage from './pages/List'
import UserViewPage from './pages/View'

const UsersManagementRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<UserListPage />} />
      <Route path='/list' element={<UserListPage />} />
      <Route path='/add' element={<UserAddPage />} />
      <Route path='/edit/:id' element={<UserEitPage />} />
      <Route path='/grade/:id' element={<GradePage />} />
      <Route path='/view/:id' element={<UserViewPage />} />
    </Routes>
  )
}

export default UsersManagementRoutes
