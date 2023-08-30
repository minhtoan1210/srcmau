import { Route, Routes } from 'react-router-dom'

import PropertiesAddPage from './pages/Add'
import PropertiesEitPage from './pages/Edit'
import PropertiesListPage from './pages/List'
import PropertyViewPage from './pages/View'

const PropertiesRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<PropertiesListPage />} />
      <Route path='/list' element={<PropertiesListPage />} />
      <Route path='/add' element={<PropertiesAddPage />} />
      <Route path='/edit/:id' element={<PropertiesEitPage />} />
      <Route path='/view/:id' element={<PropertyViewPage />} />
    </Routes>
  )
}

export default PropertiesRoutes
