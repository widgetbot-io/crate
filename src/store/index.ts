import produce from 'immer'
import { Action, handleActions } from 'redux-actions'

import Options from '../types/options'
import { State } from '../types/store'
import { TOGGLE, UPDATE_OPTIONS } from './actions/constants'

const store = handleActions<State, any>(
  {
    [TOGGLE]: (state, action: Action<{ open?: boolean }>) =>
      produce(state, draft => {
        const { open } = action.payload
        draft.open = typeof open === 'boolean' ? open : !state.open
      }),

    [UPDATE_OPTIONS]: (state, action: Action<Options>) =>
      produce(state, draft => {
        const options = action.payload
        Object.keys(options).forEach(
          option => (draft.options[option] = options[option])
        )
      })
  },
  null
)

export default store
