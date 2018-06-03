import { createAction } from 'redux-actions'

import Options from '../../types/options'
import { Notification } from '../../types/store'
import {
  NOTIFICATION,
  REMOVE_NOTIFICATION,
  TOGGLE,
  TOGGLE_VISIBLITY,
  UPDATE_OPTIONS,
} from './constants'

export const updateOptions = createAction<Options>(UPDATE_OPTIONS)

export const toggle = createAction<boolean>(TOGGLE)
export const toggleVisibility = createAction<boolean>(TOGGLE_VISIBLITY)

export const message = createAction<Notification>(NOTIFICATION)
export const deleteMessage = createAction<{ id: string; delete?: boolean }>(
  REMOVE_NOTIFICATION
)
