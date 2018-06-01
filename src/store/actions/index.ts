import { createAction } from 'redux-actions'

import Options from '../../types/options'
import { TOGGLE, UPDATE_OPTIONS } from './constants'

export const updateOptions = createAction<Options>(UPDATE_OPTIONS)
export const toggle = createAction<{ open?: boolean }>(TOGGLE)
