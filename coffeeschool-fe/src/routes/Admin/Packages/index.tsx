import { Route, Routes } from 'react-router-dom'

import PackageAddPage from './pages/Add'
import PackageEitPage from './pages/Edit'
import PackageListPage from './pages/List'
import PackageViewPage from './pages/View'

const PackagesRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<PackageListPage />} />
      <Route path='/list' element={<PackageListPage />} />
      <Route path='/add' element={<PackageAddPage />} />
      <Route path='/edit/:id' element={<PackageEitPage />} />
      <Route path='/view/:id' element={<PackageViewPage />} />
    </Routes>
  )
}

export default PackagesRoutes
