import { Route, Routes } from 'react-router-dom'

import FileCollectionsAddPage from './pages/Add'
import FileCollectionsEitPage from './pages/Edit'
import FileCollectionsListPage from './pages/List'

const FileCollectionsRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<FileCollectionsListPage />} />
      <Route path='/list' element={<FileCollectionsListPage />} />
      <Route path='/add' element={<FileCollectionsAddPage />} />
      <Route path='/edit/:id' element={<FileCollectionsEitPage />} />
    </Routes>
  )
}

export default FileCollectionsRoutes
