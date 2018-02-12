import * as React from 'react'
import jss from '../../jss/Modals/UserPopup'
import { Config } from '../../definitions/config'
import { Modal } from '../../definitions/modal'
const color = require('color')

interface Props {
  config: Config
  user: Modal.user
}

export class UserPopup extends React.Component<Props, {}> {
  classes: any

  componentWillMount() {
    const { config } = this.props
    this.classes = jss(config)
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps && JSON.stringify(nextProps.config) !== JSON.stringify(this.props.config)) {
      this.classes = jss(nextProps.config)
      this.forceUpdate()
    }
  }

  render() {
    const { config, user } = this.props
    const { classes } = this
    return (
      user ? (
        <div>
          <div className={`crate-modal-profile ${classes.profile}`}>
            <div className={`crate-modal-avatar ${classes.avatar}`} onClick={() => window.open(user.avatar ? `${user.avatar.split('?')[0]}?size=2048` : 'https://beta.widgetbot.io/embed/299881420891881473/336898706869583872/0002/default.webp')}>
              <img
                className={`${classes['avatar-img']}`}
                src={user.avatar || 'https://beta.widgetbot.io/embed/335391242248519680/335391242248519680/0002/default.webp'} />
              <div className={`${classes['view-avatar-circle']}`}>
                <span className={`${classes['view-avatar']}`}>View avatar</span>
              </div>
            </div>
            <div className={`crate-modal-name ${classes.name}`}>
              {user.name}
              {this.parseTags(user)}
            </div>
          </div>
          {user.roles && user.roles.length > 1 && <div className={`crate-modal-description ${classes.description}`}>
            <Roles classes={classes} roles={user.roles} />
          </div>}
        </div>
      ) : (
          <div />
        )
    )
  }

  parseTags(user: Modal.user) {
    const { classes } = this
    return (
      <span>
        {/^294916911194570754|111783814740594688$/.test(user.id) ? (
          <a href={user.id == '111783814740594688' ? 'https://voakie.com' : 'https://samdd.me/?devtag'} target='blank_' className={classes.link}>
            <span className={`crate-modal-role-bot crate-modal-role-developer ${classes.bot}`}>DEV</span>
          </a>
        ) : /^300908951665508353|356856478495408129|293731150239891456$/.test(user.id) ? (
          <span className={`crate-modal-role-bot crate-modal-role-widgetbot ${classes.bot}`}>WIDGETBOT</span>
        ) : user.bot ? (
          <span className={`crate-modal-role-bot ${classes.bot}`}>BOT</span>
        ) : null}
      </span>
    )
  }
}

interface Roles {
  classes: any
  roles: Modal.roles[]
}

class Roles extends React.Component<any> {
  compare(a, b) {
    if (a.position < b.position)
      return 1
    if (a.position > b.position)
      return -1
    return 0
  }

  render() {
    const { classes } = this.props
    const roles = this.props.roles.sort(this.compare)

    return (
      <div className={`crate-modal-roles ${classes.userRoles}`}>
        <div className={`crate-modal-roles-title ${classes.title}`}>{`Role${roles.length > 2 ? 's' : ''}`}</div>
        <div className={`crate-modal-roles ${classes.roles}`}>
          {roles.map((role: Modal.roles, index) => {
            if (role.name === '@everyone' || '') return null
            const roleColor = role.color.match(/^#000|#000000|#fff|#ffffff$/) ? color('#b9bbbe') : color(role.color)
            return (
              <div className={`crate-modal-role ${classes.role}`} style={{ color: roleColor.rgb().string(), borderColor: roleColor.fade(0.6).rgb().string() }} key={index}>
                <div className={`crate-modal-role-color ${classes['role-color']}`} />
                <div className={`crate-modal-role-name ${classes['role-name']}`}>
                  {role.name}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}