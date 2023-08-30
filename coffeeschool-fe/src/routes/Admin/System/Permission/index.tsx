import { Route, Routes } from 'react-router-dom'

import PermissionsAddPage from './pages/Add'
import PermissionEitPage from './pages/Edit'
import PermissionListPage from './pages/List'
import PermissionsViewPage from './pages/View'

const PermissionRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<PermissionListPage />} />
      <Route path='/list' element={<PermissionListPage />} />
      <Route path='/add' element={<PermissionsAddPage />} />
      <Route path='/edit/:id' element={<PermissionEitPage />} />
      <Route path='/view/:id' element={<PermissionsViewPage />} />
    </Routes>
  )
}

export default PermissionRoutes
