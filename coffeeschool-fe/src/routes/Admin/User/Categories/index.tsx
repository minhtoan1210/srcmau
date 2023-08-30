import { Route, Routes } from 'react-router-dom'

import CategoriesAddPage from './pages/Add'
import CategoriesEitPage from './pages/Edit'
import CategoriesListPage from './pages/List'
import CategoriesViewPage from './pages/View'

const CategoriesRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<CategoriesListPage />} />
      <Route path='/list' element={<CategoriesListPage />} />
      <Route path='/add' element={<CategoriesAddPage />} />
      <Route path='/edit/:id' element={<CategoriesEitPage />} />
      <Route path='/view/:id' element={<CategoriesViewPage />} />
    </Routes>
  )
}

export default CategoriesRoutes
