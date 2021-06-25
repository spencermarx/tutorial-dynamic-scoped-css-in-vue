import Vue from 'vue'
import marked from 'marked'
import { v4 as uuid } from 'uuid'

export default Vue.extend({
  name: 'Markdown',
  props: {
    content: {
      type: String,
      required: true,
    },
    rawCss: {
      type: String,
      required: true,
    },
  },
  data() {
    return { wrapperId: uuid() }
  },
  computed: {
    markdownHtml() {
      return marked(this.content)
    },
    compiledCss() {
      if (this.rawCss && this.rawCss.length > 0) {
        const prefixedCss = this.prefixCss(this.rawCss)
        return prefixedCss
      }
      return ''
    },
  },
  methods: {
    prefixCss(css) {
      let id = `#${this.wrapperId}`
      let char
      let nextChar
      let isAt
      let isIn
      const classLen = id.length

      // makes sure the id will not concatenate the selector
      id += ' '

      // removes comments
      css = css.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '')

      // makes sure nextChar will not target a space
      css = css.replace(/}(\s*)@/g, '}@')
      css = css.replace(/}(\s*)}/g, '}}')

      for (let i = 0; i < css.length - 2; i++) {
        char = css[i]
        nextChar = css[i + 1]

        if (char === '@' && nextChar !== 'f') isAt = true
        if (!isAt && char === '{') isIn = true
        if (isIn && char === '}') isIn = false

        if (
          !isIn &&
          nextChar !== '@' &&
          nextChar !== '}' &&
          (char === '}' ||
            char === ',' ||
            ((char === '{' || char === ';') && isAt))
        ) {
          css = css.slice(0, i + 1) + id + css.slice(i + 1)
          i += classLen
          isAt = false
        }
      }

      // prefix the first select if it is not `@media` and if it is not yet prefixed
      if (css.indexOf(id) !== 0 && css.indexOf('@') !== 0) css = id + css
      return css
    },
  },
  render(createElement) {
    const styleElement = createElement('style', {
      domProps: {
        innerHTML: this.compiledCss,
      },
    })

    const markdownElement = createElement('div', {
      attrs: { id: this.wrapperId },
      domProps: {
        innerHTML: this.markdownHtml,
      },
    })

    return createElement('div', {}, [markdownElement, styleElement])
  },
})
