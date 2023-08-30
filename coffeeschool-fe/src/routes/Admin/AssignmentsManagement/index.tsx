import { Route, Routes } from 'react-router-dom'

import AssignmentItemsRoutes from './AssignmentItems'
import AssignmentRoutes from './Assignments'

// import CoursesRoutes from './Courses'

const AssignmentManagementRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/assignments/*' element={<AssignmentRoutes />} />
      <Route path='/assignment-items/*' element={<AssignmentItemsRoutes />} />
      {/* <Route path='/courses/*' element={<CoursesRoutes />} /> */}
    </Routes>
  )
}

export default AssignmentManagementRoutes
