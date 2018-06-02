import produce from 'immer'
import { Action, handleActions } from 'redux-actions'

import Options from '../types/options'
import { Notification, State } from '../types/store'
import {
  NOTIFICATION,
  REMOVE_NOTIFICATION,
  TOGGLE,
  UPDATE_OPTIONS,
} from './actions/constants'

const store = handleActions<State, any>(
  {
    [TOGGLE]: (state, action: Action<{ open?: boolean }>) =>
      produce(state, draft => {
        const { open } = action.payload
        draft.open = typeof open === 'boolean' ? open : !state.open
      }),

    [UPDATE_OPTIONS]: (state, action: Action<Options>) => ({
      ...state,
      options: {
        ...state.options,
        ...action.payload
      }
    }),

    [NOTIFICATION]: (state, action: Action<Notification>) =>
      produce(state, draft => {
        draft.notifications.push({
          visible: true,
          ...action.payload
        })
      }),

    [REMOVE_NOTIFICATION]: (
      state,
      action: Action<{ id: string; animate?: boolean }>
    ) =>
      produce(state, draft => {
        const animate =
          typeof action.payload.animate === 'boolean'
            ? action.payload.animate
            : true

        const index = draft.notifications.findIndex(
          message => message.id === action.payload.id
        )

        if (index !== -1) {
          if (animate) {
            // Animate visibility
            draft.notifications[index].visible = false
          } else {
            // Remove entirely
            draft.notifications.splice(index, 1)
          }
        }
      })
  },
  null
)

export default store
