import { Route, Routes } from 'react-router-dom'

import CategoriesRoutes from './Categories'
import EventsRoutes from './Events'
import HobbiesRoutes from './Hobbies'
import PropertiesRoutes from './Properties'
import SkillsRoutes from './Skills'
import TitlesRoutes from './Titles'

const UserRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/events/*' element={<EventsRoutes />} />
      <Route path='/properties/*' element={<PropertiesRoutes />} />
      <Route path='/categories/*' element={<CategoriesRoutes />} />
      <Route path='/skills/*' element={<SkillsRoutes />} />
      <Route path='/hobbies/*' element={<HobbiesRoutes />} />
      <Route path='/titles/*' element={<TitlesRoutes />} />
    </Routes>
  )
}

export default UserRoutes
