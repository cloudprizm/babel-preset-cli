const { declare } = require("@babel/helper-plugin-utils")
const { addHook } = require("pirates")
const { transformSync } = require("@babel/core")

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

// RUNTIME TRANSPILATION PART

let alreadyHooked

preset.bootstrap = ({ cwd, presets, extensions, matcher, ...rest } = {}) => {
  const compile = (code, filename) =>
    transformSync(code, {
      filename,
      presets: ['@hungry/cli'],
      babelrc: false,
      configFile: false,
      ...rest
    }).code

  alreadyHooked = addHook(compile, {
    exts: extensions || [".ts", ".tsx"],
    ignoreNodeModules: !matcher ? true : false,
    matcher: matcher ? matcher : () => true,
  })

  return alreadyHooked
}

preset.disableRuntimeTranspilation = () => {
  if (alreadyHooked) alreadyHooked()
}

preset.enableRuntimeTranspilation = preset.bootstrap

module.exports = preset
