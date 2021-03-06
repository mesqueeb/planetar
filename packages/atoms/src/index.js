import PlanetarAnchor from './components/PlanetarAnchor.vue'
import PlanetarInput from './components/PlanetarInput.vue'
import PlanetarList from './components/PlanetarList.vue'
import PlanetarSelect from './components/PlanetarSelect.vue'
import PlanetarTabs from './components/PlanetarTabs.vue'
import PlanetarToggle from './components/PlanetarToggle.vue'

export { PlanetarAnchor, PlanetarInput, PlanetarList, PlanetarSelect, PlanetarTabs, PlanetarToggle }

export default {
  install(Vue) {
    Vue.component(PlanetarAnchor.name, PlanetarAnchor)
    Vue.component(PlanetarInput.name, PlanetarInput)
    Vue.component(PlanetarList.name, PlanetarList)
    Vue.component(PlanetarSelect.name, PlanetarSelect)
    Vue.component(PlanetarTabs.name, PlanetarTabs)
    Vue.component(PlanetarToggle.name, PlanetarToggle)
  },
}
