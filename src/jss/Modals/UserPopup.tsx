import { Config } from '../../definitions/config'
import jss from 'jss'
const color = require('color')
// @ts-ignore
import camelCase from 'jss-camel-case'
// @ts-ignore
import nested from 'jss-nested'

// @ts-ignore
jss.use(camelCase(), nested())

export default (config: Config) => {
  const styles = {
    'profile': {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      padding: '20px 10px',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif',
    },
    'avatar': {
      position: 'relative',
      borderRadius: '100%',
      marginBottom: '10px',
      height: '85px',
      width: '85px',
      flexShrink: '0',
      flexGrow: '0',
      cursor: 'pointer',
      MozTransition: 'filter 0.2s ease',
      OTransition: 'filter 0.2s ease',
      WebkitTransition: 'filter 0.2s ease',
      transition: 'filter 0.2s ease',
      overflow: 'hidden',
    },
    'name': {
      color: '#f6f6f7',
      letterSpacing: 0.3,
      textTransform: 'uppercase',
      fontWeight: '600',
      fontSize: '16px',
      padding: '0px 10px',
      fontFamily: 'Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif',
    },
    'bot': {
      flexShrink: '0',
      borderRadius: '3px',
      textTransform: 'uppercase',
      verticalAlign: 'bottom',
      marginLeft: '6px',
      fontSize: '10px',
      fontWeight: '500',
      background: '#fff',
      color: '#7289da !important',
      lineHeight: '22px',
      padding: '0 3px',
      fontFamily: 'Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif',
    },
    'link': {
      textDecoration: 'none',
    },

    'avatar-img': {
      width: '100%',
      height: '100%'
    },
    'view-avatar-circle': {
      color: '#fff',
      opacity: '0',
      width: '100%',
      height: '100%',
      display: 'flex',
      position: 'absolute',
      top: '0',
      justifyContent: 'center',
      WebkitBoxAlign: 'center',
      alignItems: 'center',
      MozTransition: 'opacity 0.1s ease',
      OTransition: 'opacity 0.1s ease',
      WebkitTransition: 'opacity 0.1s ease',
      transition: 'opacity 0.1s ease',
      WebkitBoxShadow: 'inset 0 0 120px rgba(0,0,0,0.85)',
      MozBoxShadow: 'inset 0 0 120px rgba(0,0,0,0.85)',
      boxShadow: 'inset 0 0 120px rgba(0,0,0,0.85)',
      '&:hover ': {
        opacity: 1
      }
    },
    'view-avatar': {
      textTransform: 'uppercase',
      padding: '4px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontWeight: '700',
      lineHeight: '12px',
      fontSize: '10px',
      fontFamily: 'Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif',
    },

    'description': {
      backgroundColor: '#2f3136',
      color: 'rgba(255,255,255,0.8)',
      padding: '12px 10px 10px',
      fontFamily: 'Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif',
    },
    'title': {
      color: '#72767d',
      textTransform: 'uppercase',
      marginBottom: '8px',
      fontWeight: '700',
      fontSize: '12px',
      fontFamily: 'Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif',
    },
    'roles': {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: '12px',
      marginBottom: '20px',
      fontFamily: 'Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif',
    },
    'role': {
      padding: '5px 6px',
      fontSize: '14px',
      border: '1px solid currentColor',
      borderRadius: '15px',
      margin: '4px',
      display: 'flex',
      lineHeight: '19px',
      overflow: 'hidden',
      fontFamily: 'Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif',
    },
    'role-color': {
      float: 'left',
      background: 'currentColor',
      borderRadius: '50%',
      height: '12px',
      width: '12px',
      marginRight: '4px',
      fontFamily: 'Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif',
    },
    'role-name': {
      display: 'inline-block',
      lineHeight: '12px',
      fontSize: '12px',
      fontWeight: '500',
      textOverflow: 'ellipsis',
      marginRight: '4px',
      color: 'rgba(255,255,255,0.8)',
      fontFamily: 'Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif',
    }
  }

  return jss.createStyleSheet(styles).attach().classes
}