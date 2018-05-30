import { handleActions } from 'redux-actions'

import { State } from '../types/store'
import { TEST } from './actions/constants'
import defaultState from './defaultState'

export default handleActions<State>(
  {
    [TEST]: (state, action): State => {
      return {
        ...state,
        test: true
      }
    }
  },
  defaultState
)
