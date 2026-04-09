// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'

export default withNuxt(
  {
    name: 'project/rules',
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 0
        }
      ]
    }
  },
  {
    name: 'project/vue-formatting',
    files: ['**/*.vue'],
    rules: {
      'vue/first-attribute-linebreak': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-indent': 'off',
      'vue/html-self-closing': 'off'
    }
  },
  {
    name: 'project/vue-naming-exceptions',
    files: ['app/components/Main.vue', 'app/components/Footer.vue'],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },
  eslintConfigPrettier
)
