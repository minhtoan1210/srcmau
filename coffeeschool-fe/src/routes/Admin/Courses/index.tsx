import { Route, Routes } from 'react-router-dom'

import CoursesAddPage from './pages/Add'
import CoursesEitPage from './pages/Edit'
import CoursesListPage from './pages/List'

const CoursesRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<CoursesListPage />} />
      <Route path='/list' element={<CoursesListPage />} />
      <Route path='/add' element={<CoursesAddPage />} />
      <Route path='/edit/:id' element={<CoursesEitPage />} />
    </Routes>
  )
}

export default CoursesRoutes
