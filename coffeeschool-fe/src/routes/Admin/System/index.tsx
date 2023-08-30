import { Route, Routes } from 'react-router-dom'

import PermissionRoutes from './Permission'
import RolesRoutes from './Roles'

const SystemRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/roles/*' element={<RolesRoutes />} />
      <Route path='/permissions/*' element={<PermissionRoutes />} />
    </Routes>
  )
}

export default SystemRoutes
