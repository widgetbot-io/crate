import * as React from 'react'
import { View } from '../definitions/view'
import jss from '../jss/Modal'
// @ts-ignore
import Transition from 'react-transition-group/Transition'

import { UserPopup } from './Modals/UserPopup'
import { ImagePopup } from './Modals/ImagePopup'

interface Props extends View {
  modal: any
  toggle: any
}

export class Modal extends React.Component<Props, {}> {
  classes: any

  componentWillMount() {
    let { config } = this.props
    this.classes = jss(config)

    window.addEventListener('keydown', this.keys.bind(this), false)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keys.bind(this), false)
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps &&
      JSON.stringify(nextProps.config) !== JSON.stringify(this.props.config)
    ) {
      this.classes = jss(nextProps.config)
      this.forceUpdate()
    }
  }

  keys = (event) => {
    const { view, toggle } = this.props
    if (view.modalOpen && event.keyCode === 27) {
      toggle(false)
    }
  }

  render() {
    let { view, modal, config, toggle } = this.props
    let { classes } = this
    return (
      <Transition in={view.modalOpen} timeout={300}>
        {(state) => (
          <div
            className={`crate-modal ${classes.modal} ${
              state ? `${classes.modal}-${state}` : ``
            }`}
            onClick={(event) => {
              if (event.target === event.currentTarget) toggle(false)
            }}>
            <div
              className={`crate-modal-card ${classes.card} ${
                modal.type === 'image'
                  ? `crate-image-modal ${classes.card}-image`
                  : ``
              }`}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 12 12"
                className={`crate-modal-close ${classes.close} ${
                  modal.type === 'image' ? `${classes.close}-image` : ``
                }`}
                onClick={() => toggle(false)}>
                <path d="M0 0h12v12H0" />
                <path
                  className={`${classes.svg}`}
                  d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"
                />
              </svg>
              {modal.type === 'user' && (
                <UserPopup user={modal.data} config={config} />
              )}
              {modal.type === 'image' && (
                <ImagePopup
                  url={modal.data}
                  config={config}
                  toggle={toggle.bind(this)}
                />
              )}
            </div>
          </div>
        )}
      </Transition>
    )
  }
}
