import { Route, Routes } from 'react-router-dom'

import MyFilesAddPage from './pages/Add'
// import MyFilesEitPage from './pages/Edit'
import MyFilesListPage from './pages/List'

const MyFilesRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<MyFilesListPage />} />
      <Route path='/list' element={<MyFilesListPage />} />
      <Route path='/add' element={<MyFilesAddPage />} />
      {/* <Route path='/edit/:id' element={<MyFilesEitPage />} /> */}
    </Routes>
  )
}

export default MyFilesRoutes
