import Positive from './positive.js'
import Alphabet from './alphabet.js'
const directives = [Positive]
const directives2 = [Alphabet]
export default {
  install: Vue => {
    if (directives.length && directives.length > 0) {
      directives.map(item => {
        Vue.directive(item.key, item.func)
      })
    }
    if (directives2.length && directives2.length > 0) {
      directives2.map(item => {
        Vue.directive(item.key, item.func)
      })
    }
  }
}
