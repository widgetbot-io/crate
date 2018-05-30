import Crate from './api'

if (window) {
  ;(window as any).Crate = Crate
}

// Evaluate content inside <script> tag
if (document && document.currentScript) {
  const script = document.currentScript
  eval(script.innerHTML)
}
