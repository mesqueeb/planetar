import { version } from '../package.json'

import ApiCard from './components/ApiCard'

export { version, ApiCard }

export default {
  version,

  ApiCard,

  install (Vue) {
    Vue.component(ApiCard.name, ApiCard)
  },
}
