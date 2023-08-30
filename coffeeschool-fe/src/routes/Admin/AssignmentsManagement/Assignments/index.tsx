import { Route, Routes } from 'react-router-dom'

import AssignmentAddPage from './pages/Add'
import AssignmentListPage from './pages/List'
import AssignmentViewPage from './pages/View'

const AssignmentRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<AssignmentListPage />} />
      <Route path='/list' element={<AssignmentListPage />} />
      <Route path='/add' element={<AssignmentAddPage />} />
      <Route path='/view/:id' element={<AssignmentViewPage />} />
    </Routes>
  )
}

export default AssignmentRoutes
