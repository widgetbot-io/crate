import produce from 'immer'
import { Action, handleActions } from 'redux-actions'

import Options from '../types/options'
import { Notification, State } from '../types/store'
import {
  NOTIFICATION,
  REMOVE_NOTIFICATION,
  TOGGLE,
  TOGGLE_VISIBILITY,
  UPDATE_OPTIONS,
} from './actions/constants'

const store = handleActions<State, any>(
  {
    [TOGGLE]: (state, { payload }: Action<boolean>) =>
      produce(state, draft => {
        const open = typeof payload === 'boolean' ? payload : !state.open
        draft.open = open

        // Load the embed if necessary
        if (open) draft.interactive = true

        // Reset notifications + unread count
        draft.notifications = []
        draft.unread = 0
      }),

    [TOGGLE_VISIBILITY]: (state, { payload }: Action<boolean>) => ({
      ...state,
      visible: payload
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
        draft.unread++

        draft.notifications.push({
          visible: true,
          ...action.payload
        })
      }),

    [REMOVE_NOTIFICATION]: (
      state,
      action: Action<{ id: string; delete?: boolean }>
    ) =>
      produce(state, draft => {
        const remove =
          typeof action.payload.delete === 'boolean'
            ? action.payload.delete
            : false

        const index = draft.notifications.findIndex(
          message => message.id === action.payload.id
        )

        if (index !== -1) {
          if (remove) {
            draft.unread--
            draft.notifications.splice(index, 1)
          } else {
            // Animate visibility
            draft.notifications[index].visible = false
          }
        }
      })
  },
  null
)

export default store
