'use strict'

/**
 * @type {import('lint-staged').Configuration}
 */
const config = {
  '*.{js,jsx,cjs,mjs,ts,tsx}': ['eslint', 'prettier --write'],
  '*.md': ['prettier --write'],
}
export default config
