import { Route, Routes } from 'react-router-dom'

// import PaymentAddPage from './pages/Add'
// import PaymentEitPage from './pages/Edit'
import PaymentListPage from './pages/List'

const PaymentRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<PaymentListPage />} />
      <Route path='/list' element={<PaymentListPage />} />
      {/* <Route path='/add' element={<PaymentAddPage />} /> */}
      {/* <Route path='/edit/:id' element={<PaymentEitPage />} /> */}
    </Routes>
  )
}

export default PaymentRoutes
