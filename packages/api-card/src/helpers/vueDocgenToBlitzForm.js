import { isUndefined, isArray, isString } from 'is-what'
import { evaluateString } from './evaluateString'

/**
 * @typedef PropDescriptor
 * @type {{
  type?: { name: string; func?: boolean }
  description?: string
  required?: boolean
  defaultValue?: { value: string; func?: boolean }
  tags?: { [title: string]: BlockTag[] }
  values?: string[]
  name: string
}}
 */

function parseExample(example) {
  return `\`${example}\``
}

/**
 * @param {PropDescriptor} vueDocgenProp
 * @returns {{categories: string[], schema: object}} BlitzForm schema blueprint
 */
export function propToPropSchema(vueDocgenProp) {
  if (process && process.env && process.env.DEV) console.log(`vueDocgenProp → `, vueDocgenProp)
  // get the documentation I want to use from the vueDocgenProp
  const {
    required,
    description,
    type = { name: 'any' },
    defaultValue: defaultValueInfo = {},
    values = [],
    tags: customTags = {},
    name: propName,
    properties = [],
  } = vueDocgenProp
  // format the top level tags
  const types = isString(type.name) ? type.name.split('|').map((s) => s.trim()) : ['any']
  function typeIs(_type) {
    const propType = types[0]
    const yes = propType === _type && types.length === 1
    if (yes) return yes
    if (_type === 'object') {
      return propType[0] === '{' && propType[propType.length - 1] === '}'
    }
    return yes
  }
  // get the documentation I want to use from the custom tags
  const _typeTags = customTags.type || []
  const typeTags = _typeTags.map((t) => t.type.name)

  const _inheritedProp = customTags.inheritedProp || [{ description: false }]
  const inheritedProp = _inheritedProp[0].description

  const _examples = customTags.example || []
  const _categories =
    customTags.category ||
    (!inheritedProp ? [{ description: 'general' }] : [{ description: 'inheritedProp' }])
  // format the custom tags for usage
  const examples = _examples.map((e) => e.description)
  const categories = _categories.map((c) => c.description)

  const isSlot = categories.includes('slots')
  const isEvent = categories.includes('events')
  const isMethod = categories.includes('methods')

  // whatever the prop is, default to an 'input'
  let component = isSlot || isEvent || isMethod ? undefined : 'PlanetarInput'
  let subLabel = description
  let options,
    disable,
    parseInput,
    parseValue,
    autogrow,
    debounce,
    span,
    emitValue,
    inputType,
    defaultValue
  let fieldClasses = []

  if (typeTags.length && !isEvent) {
    subLabel += `\n\nType: \`${typeTags[0]}\``
  }
  if (!typeTags.length && types.length && !isEvent) {
    subLabel += `\n\nType: \`${types.join(', ')}\``
  }

  if (properties.length && isEvent) {
    subLabel += `\n\nParams:`
    properties.forEach(({ description, name, type }) => {
      subLabel += `\n- **${name}**${description ? ' - ' : ''}${
        description || ''
      }<br />Type: \`${type.names.join(' | ')}\``
    })
  }

  defaultValue = defaultValueInfo.value
  const requiresNewline =
    defaultValueInfo && defaultValueInfo.value && defaultValueInfo.value.includes('\n')
  if (requiresNewline) {
    inputType = 'textarea'
    autogrow = true
  }
  const _df = evaluateString(defaultValueInfo.value)
  // If it has a default, write it in the description
  if (!isUndefined(_df)) {
    if (requiresNewline) {
      subLabel += `\n\nDefault:\n\`\`\`\n${defaultValueInfo.value}\n\`\`\``
    } else {
      subLabel += `\n\nDefault: \`${defaultValueInfo.value}\``
    }
  }
  // if the prop is a Boolean, show this as a 'toggle'
  if (types.includes('boolean') || (typeTags.length && typeTags.includes('boolean'))) {
    component = 'PlanetarToggle'
    defaultValue = eval(defaultValue)
  }
  // if it's a Number field
  if (typeIs('number')) {
    inputType = 'number'
    parseInput = Number
  }
  const valuesCalculated = values.length
    ? values.map(JSON.stringify)
    : typeTags.length
    ? typeTags[0]
        .split('|')
        .map((t) => t.trim())
        .filter((t) => t[0] === `'` && t[t.length - 1] === `'`)
    : []
  // if the prop has a fixed set of possible values, show this as an 'option'
  const propHasValues = isArray(valuesCalculated) && valuesCalculated.length > 1
  if (propHasValues) {
    component = 'PlanetarSelect'
    options = valuesCalculated
  }
  // Create a special input for defining arrays and/or objects
  if (
    typeIs('array') ||
    typeIs('object') ||
    typeIs('function') ||
    (isArray(types) && ['array', 'object'].some((t) => types.includes(t)) && types.length === 2)
  ) {
    debounce = 500
    autogrow = true
  }
  if (examples.length) {
    const examplesParsed =
      examples.length === 1
        ? parseExample(examples[0])
        : examples.map((e) => `\n- ${parseExample(e)}`).join('')
    subLabel += `\n\nExample${examples.length === 1 ? '' : 's'}: ${examplesParsed}`
  }
  // remove any "undefined" from the string
  if (subLabel) subLabel = subLabel.replace('undefined\n\n', '')
  // Create the blueprint for the prop
  const schema = {
    required,
    id: propName,
    component,
    type: inputType,
    label: propName,
    subLabel,
    inheritedProp,
    options,
    disable,
    parseInput,
    parseValue,
    autogrow,
    fieldClasses,
    debounce,
    span,
    emitValue,
    // if the prop is `true` by default, set to true
    defaultValue,
    // defaults
    hasMarkdown: true,
    isCode: true,
  }
  // remove undefined
  const schemaNoUndefined = Object.entries(schema).reduce((carry, [key, value]) => {
    if (value === undefined) return carry
    return { ...carry, [key]: value }
  }, {})

  return { categories, schema: schemaNoUndefined }
}
