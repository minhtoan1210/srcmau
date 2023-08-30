import { Route, Routes } from 'react-router-dom'

import SkillsAddPage from './pages/Add'
import SkillsEitPage from './pages/Edit'
import SkillsListPage from './pages/List'
import SkillsViewPage from './pages/View'

const SkillsRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<SkillsListPage />} />
      <Route path='/list' element={<SkillsListPage />} />
      <Route path='/add' element={<SkillsAddPage />} />
      <Route path='/edit/:id' element={<SkillsEitPage />} />
      <Route path='/view/:id' element={<SkillsViewPage />} />
    </Routes>
  )
}

export default SkillsRoutes
