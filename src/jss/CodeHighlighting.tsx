const font = {
  fontFamily: 'Menlo, Consolas, Monaco, monospace',
}
export default {
  light: {
    '& .hljs-comment, .hljs-quote': {
      ...font,
      color: '#586e75'
    },
    '& .hljs-addition, .hljs-keyword, .hljs-selector-tag': {
      ...font,
      color: '#859900'
    },
    '& .hljs-doctag, .hljs-literal, .hljs-meta .hljs-meta-string, .hljs-number, .hljs-regexp, .hljs-string': {
      ...font,
      color: '#2aa198'
    },
    '& .hljs-name, .hljs-section, .hljs-selector-class, .hljs-selector-id, .hljs-title': {
      ...font,
      color: '#268bd2'
    },
    '& .hljs-attr, .hljs-attribute, .hljs-class .hljs-title, .hljs-template-variable, .hljs-type, .hljs-variable': {
      ...font,
      color: '#b58900'
    },
    '& .hljs-bullet, .hljs-link, .hljs-meta, .hljs-meta .hljs-keyword, .hljs-selector-attr, .hljs-selector-pseudo, .hljs-subst, .hljs-symbol': {
      ...font,
      color: '#cb4b16'
    },
    '& .hljs-built_in, .hljs-deletion': {
      ...font,
      color: '#dc322f'
    },
    '& .hljs-formula': {
      ...font,
      background: '#073642'
    },
    '& .hljs-emphasis': {
      ...font,
      fontStyle: 'italic'
    },
    '& .hljs-strong': {
      ...font,
      fontWeight: '700'
    }
  },
  dark: {
    '& .hljs-comment, .hljs-quote': {
      ...font,
      color: '#586e75'
    },
    '& .hljs-addition, .hljs-keyword, .hljs-selector-tag': {
      ...font,
      color: '#859900'
    },
    '& .hljs-doctag, .hljs-literal, .hljs-meta .hljs-meta-string, .hljs-number, .hljs-regexp, .hljs-string': {
      ...font,
      color: '#2aa198'
    },
    '& .hljs-name, .hljs-section, .hljs-selector-class, .hljs-selector-id, .hljs-title': {
      ...font,
      color: '#268bd2'
    },
    '& .hljs-attr, .hljs-attribute, .hljs-class .hljs-title, .hljs-template-variable, .hljs-type, .hljs-variable': {
      ...font,
      color: '#b58900'
    },
    '& .hljs-bullet, .hljs-link, .hljs-meta, .hljs-meta .hljs-keyword, .hljs-selector-attr, .hljs-selector-pseudo, .hljs-subst, .hljs-symbol': {
      ...font,
      color: '#cb4b16'
    },
    '& .hljs-built_in, .hljs-deletion': {
      ...font,
      color: '#dc322f'
    },
    '& .hljs-formula': {
      ...font,
      background: '#073642'
    },
    '& .hljs-emphasis': {
      ...font,
      fontStyle: 'italic'
    },
    '& .hljs-strong': {
      ...font,
      fontWeight: '700'
    }
  }
}
