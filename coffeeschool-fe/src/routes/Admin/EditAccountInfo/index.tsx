import { Route, Routes } from 'react-router-dom'

import EditFull from './EditFull'
import MyAccount from './MyAccount'
// import MyFiles from './MyFiles'
import MyProFile from './MyProfile'

export default function EditAccountInfoPage(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<EditFull />} />
      <Route path='/my-account' element={<MyAccount />} />
      <Route path='/my-profile' element={<MyProFile />} />
      {/* <Route path='/my-files' element={<MyFiles />} /> */}
    </Routes>
  )
}
