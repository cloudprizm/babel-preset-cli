const { declare } = require("@babel/helper-plugin-utils")

const preset = declare((api, opts) => ({
  presets: [
    [
      "@babel/env",
      {
        targets: {
          node: "current"
        }
      }
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/transform-react-jsx"
  ]
}))

preset.bootstrap = ({ cwd, presets, ...rest } = {}) =>
  require("@babel/register")({
    presets: ['@hungry/babel-preset-cli'].concat([] || presets),
    extensions: [".ts", ".tsx"],
    cwd,
    babelrc: true,
    cache: true,
    ...rest
  })

module.exports = preset
