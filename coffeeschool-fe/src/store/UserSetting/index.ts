import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'

export interface SettingItem {
  group: string
  key: string
  value: any
}

export interface SettingState {
  count: number
  items: SettingItem[]
  perPage: number
  total: number
}

const initialState: SettingState = {
  count: 1,
  items: [],
  perPage: 1,
  total: 1,
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    gettingLogIn: (state: SettingState, action: PayloadAction<SettingItem[]>) => {
      state.items = action.payload
      return state
    },
  },
})

export const settingActions = settingSlice.actions
