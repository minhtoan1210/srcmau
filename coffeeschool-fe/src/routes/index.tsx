import AdminPages from 'containers/Admin'
import Login from 'containers/Login'

import { Route, Routes } from 'react-router-dom'

import PublicRoutes from './Public'

function ProtectedPage(): JSX.Element {
  return (
    <Routes>
      <Route path='/*' element={<PublicRoutes />} />
      <Route path='/management/login' element={<Login />} />
      <Route path='/management/*' element={<AdminPages />} />
      <Route path='*' element={<>NOT FOUND</>} />
    </Routes>
  )
}

export default ProtectedPage
