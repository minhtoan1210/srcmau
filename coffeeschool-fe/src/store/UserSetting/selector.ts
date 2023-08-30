import { createSelector } from '@reduxjs/toolkit'

import { SettingState } from '.'
import { RootState } from '..'

const getSetting = (state: RootState): SettingState => state.setting

export const selectUserSetting = createSelector(getSetting, value => value)
