import { Route, Routes } from 'react-router-dom'

import TitlesAddPage from './pages/Add'
import TitlesEitPage from './pages/Edit'
import TitlesListPage from './pages/List'

const TitlesRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<TitlesListPage />} />
      <Route path='/list' element={<TitlesListPage />} />
      <Route path='/add' element={<TitlesAddPage />} />
      <Route path='/edit/:id' element={<TitlesEitPage />} />
    </Routes>
  )
}

export default TitlesRoutes
