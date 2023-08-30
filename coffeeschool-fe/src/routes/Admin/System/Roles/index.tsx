import { Route, Routes } from 'react-router-dom'

import RolesAddPage from './pages/Add'
import RoleEitPage from './pages/Edit'
import RoleListPage from './pages/List'
import RolesViewPage from './pages/View'

const RoleRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<RoleListPage />} />
      <Route path='/list' element={<RoleListPage />} />
      <Route path='/add' element={<RolesAddPage />} />
      <Route path='/edit/:id' element={<RoleEitPage />} />
      <Route path='/view/:id' element={<RolesViewPage />} />
    </Routes>
  )
}

export default RoleRoutes
