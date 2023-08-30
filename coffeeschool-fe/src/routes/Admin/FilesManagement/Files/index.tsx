import { Route, Routes } from 'react-router-dom'

import FileAddPage from './pages/Add'
import FileEitPage from './pages/Edit'
import FileListPage from './pages/List'

const FilesRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<FileListPage />} />
      <Route path='/list' element={<FileListPage />} />
      <Route path='/add' element={<FileAddPage />} />
      <Route path='/edit/:id' element={<FileEitPage />} />
    </Routes>
  )
}

export default FilesRoutes
