import { createAction } from 'redux-actions'

import Options from '../../types/options'
import { Notification } from '../../types/store'
import {
  NOTIFICATION,
  REMOVE_NOTIFICATION,
  TOGGLE,
  UPDATE_OPTIONS,
} from './constants'

export const updateOptions = createAction<Options>(UPDATE_OPTIONS)

export const toggle = createAction<{ open?: boolean }>(TOGGLE)
export const message = createAction<Notification>(NOTIFICATION)
export const deleteMessage = createAction<{ id: string; animate?: boolean }>(
  REMOVE_NOTIFICATION
)
