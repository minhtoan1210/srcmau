import { Route, Routes } from 'react-router-dom'

import HobbiesAddPage from './pages/Add'
import HobbiesEitPage from './pages/Edit'
import HobbiesListPage from './pages/List'
import HobbiesViewPage from './pages/View'

const HobbiesRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<HobbiesListPage />} />
      <Route path='/list' element={<HobbiesListPage />} />
      <Route path='/add' element={<HobbiesAddPage />} />
      <Route path='/edit/:id' element={<HobbiesEitPage />} />
      <Route path='/view/:id' element={<HobbiesViewPage />} />
    </Routes>
  )
}

export default HobbiesRoutes
