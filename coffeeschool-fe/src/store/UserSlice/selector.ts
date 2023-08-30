import { createSelector } from '@reduxjs/toolkit'

import { UserState } from '.'
import { RootState } from '..'

const getUser = (state: RootState): UserState => state.user

export const selectUserProfile = createSelector(getUser, value => value)
