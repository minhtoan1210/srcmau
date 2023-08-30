import { Route, Routes } from 'react-router-dom'

import OrderAddPage from './pages/Add'
import OrderEitPage from './pages/Edit'
import OrderListPage from './pages/List'
import TransactionPage from './pages/Transactions'

const OrdersRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<OrderListPage />} />
      <Route path='/list' element={<OrderListPage />} />
      <Route path='/add' element={<OrderAddPage />} />
      <Route path='/edit/:id' element={<OrderEitPage />} />
      <Route path='/transactions/:id' element={<TransactionPage />} />
    </Routes>
  )
}

export default OrdersRoutes
