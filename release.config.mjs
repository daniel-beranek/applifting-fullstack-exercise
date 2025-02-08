/**
 * @type {import('semantic-release').GlobalConfig}
 */
const config = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
      },
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/github',
  ],
  tagFormat: '${version}',
}
export default config
