import { selectUserProfile } from 'store/UserSlice/selector'

import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import FileCollectionsRoutes from './FileCollections'
import FilesRoutes from './Files'
import MyFilesRoutes from './MyFiles'

const FilesManagementRoutes = (): JSX.Element => {
  const userData = useSelector(selectUserProfile)

  return (
    <Routes>
      {userData.roles.find((x: any) => x.name === 'Super Administrator') && (
        <>
          <Route path='/files/*' element={<FilesRoutes />} />
          <Route path='/file-collections/*' element={<FileCollectionsRoutes />} />
        </>
      )}
      <Route path='/my-files/*' element={<MyFilesRoutes />} />
    </Routes>
  )
}

export default FilesManagementRoutes
