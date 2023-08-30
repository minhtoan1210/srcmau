import { Route, Routes } from 'react-router-dom'

import EventsAddPage from './pages/Add'
import EventsEitPage from './pages/Edit'
import EventsListPage from './pages/List'
import EventViewPage from './pages/View'

const EventsRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<EventsListPage />} />
      <Route path='/list' element={<EventsListPage />} />
      <Route path='/add' element={<EventsAddPage />} />
      <Route path='/edit/:id' element={<EventsEitPage />} />
      <Route path='/view/:id' element={<EventViewPage />} />
    </Routes>
  )
}

export default EventsRoutes
