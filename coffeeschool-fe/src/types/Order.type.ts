import { PackageType, RoleType } from './userType'

export type OrderType = {
  uuid: string
  user: OrderUserType
  package: PackageType
  state: OrderStateType
}

export type OrderTransactionType = {
  checkoutUrl: string
  transactionCode: string
  order: OrderType
}

export type OrderUserType = {
  uuid: string
  name: string
  email: string
  roles: RoleType[]
}

export type OrderStateType = {
  description: string
  is_final: boolean
  state_code: OrderStateStatusType
  uuid: string | null
}

export type PaymentType = {
  uuid: string
  name: string
  is_cash: string
}

export type OrderStateStatusType = 'UNPAID' | 'PAID'
