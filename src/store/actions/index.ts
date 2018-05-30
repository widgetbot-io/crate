import { Action, createAction } from 'redux-actions'

import { TEST } from './constants'

export const test = createAction(TEST, (text: Action<any>) => ({}))
