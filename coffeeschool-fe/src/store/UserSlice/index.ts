import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { PropertiesType } from 'types'

export interface UserState {
  roles: { id: number; name: string }[]
  email: string
  name: string
  avatar: string
  uuid: string
  open_to_work?: boolean
  portfolio?: boolean
  properties: Array<PropertiesType>
}

const initialState: UserState = {
  roles: [],
  email: '',
  name: '',
  avatar: '',
  uuid: '',
  properties: [],
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    userLogIn: (state: UserState, action: PayloadAction<UserState>) => {
      console.log('action.payload', action.payload)
      state = action.payload
      return state
    },
    userLogOut: (state: UserState) => {
      state = initialState
      localStorage.removeItem('access_token')
      return state
    },
  },
})

export const userActions = userSlice.actions
