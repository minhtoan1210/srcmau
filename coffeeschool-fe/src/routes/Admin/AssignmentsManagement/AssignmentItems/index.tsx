import { Route, Routes } from 'react-router-dom'

import BoardCategoryAddPage from './pages/Add'
// import BoardCategoryEitPage from './pages/Edit'
import BoardCategoryListPage from './pages/List'

const BoardCategoriesRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<BoardCategoryListPage />} />
      <Route path='/list' element={<BoardCategoryListPage />} />
      <Route path='/add' element={<BoardCategoryAddPage />} />
      {/* <Route path='/edit/:id' element={<BoardCategoryEitPage />} /> */}
    </Routes>
  )
}

export default BoardCategoriesRoutes
