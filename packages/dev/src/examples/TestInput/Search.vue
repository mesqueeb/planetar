<template>
  <TestInput class="text-bold" :isSearch="isSearch" v-model="model" />
</template>

<style lang="sass" scoped>
.text-bold
  font-weight: 700
</style>

<script>
import TestInput from '../../components/TestInput'

/**
 * This is a search input example.
 * ```js
 * import { kebabCase } from 'case-anything'
 * import PlanetarTabs from '@planetar/atoms/PlanetarTabs.vue'
 * import { codeToHtml } from '../helpers/prism'
 * import { getTagHtmlFromCodeString } from '../helpers/regexp'
 * import { dynamicImport } from '../helpers/dynamicImport'
 *
 * export default {
 *   name: 'ExampleCard',
 *   components: { PlanetarTabs },
 *   props: {
 *     filePath: { type: String, required: true }
 *   },
 *   created () {
 *     const { parseComponent, filePath } = this
 *     const extension = filePath.split('.').slice(-1)[0]
 *     dynamicImport(filePath, extension, 'component').then(componentExport => {
 *       this.exampleComponent = componentExport.default
 *     })
 *     dynamicImport(filePath, extension, 'string').then(componentString => {
 *       parseComponent(componentString)
 *     })
 *   },
 *   data () {
 *     const { propsSeparateTab, filePath } = this
 *     const fileName = filePath
 *       .split('/')
 *       .slice(-1)[0]
 *       .replace('.vue', '')
 *       .replace('.jsx', '')
 *       .replace('.tsx', '')
 *     return {
 *       fileName,
 *       activeTab: 'example',
 *       tabLabels: ['example'],
 *       exampleComponent: null,
 *       parts: {
 *         template: '',
 *         script: '',
 *         style: ''
 *       }
 *     }
 *   },
 *   computed: {},
 *   methods: {
 *     kebabCase,
 *     parseComponent (componentCodeString) {
 *       const template = getTagHtmlFromCodeString('template', componentCodeString)
 *       const script = getTagHtmlFromCodeString('script', componentCodeString)
 *       const style = getTagHtmlFromCodeString('style', componentCodeString)
 *       const notAVueFile = !template && !script && !style
 *       if (notAVueFile) {
 *         this.parts.script = codeToHtml(componentCodeString, 'js')
 *         this.tabLabels.push('script')
 *         return
 *       }
 *       if (template) {
 *         this.tabLabels.push('template')
 *         this.parts.template = codeToHtml(template, 'html')
 *       }
 *       if (script) {
 *         this.tabLabels.push('script')
 *         this.parts.script = codeToHtml(script, 'html')
 *       }
 *       if (style) {
 *         this.tabLabels.push('style')
 *         this.parts.style = codeToHtml(style, 'html')
 *       }
 *     }
 *   }
 * }
 * ```
 * That's the example!
 * Here's another one!
 * ```html
 * <PlanetarTabs
 *   class="planetar-example-card"
 *   :id="kebabCase(fileName) + `-example-card`"
 *   :tabLabels="tabLabels"
 * >
 *   <template v-for="(tabLabel, index) in tabLabels" v-slot:[index]>
 *     <div class="ma-lg" v-if="tabLabel === 'example' && exampleComponent">
 *       <component :is="exampleComponent" />
 *     </div>
 *     <div
 *       v-else-if="parts[tabLabel]"
 *       class="_planetar-code"
 *       v-html="parts[tabLabel]"
 *     />
 *   </template>
 * </PlanetarTabs>
 * ```
 */
export default {
  components: { TestInput },
  data() {
    return {
      isSearch: true,
      model: '',
    }
  },
}
</script>
