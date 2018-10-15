# @hungry/babel-preset-cli

Babel preset for Node.js, with typescript and import/export syntax.

## Install
```sh
yarn add @hungry/babel-preset-cli
```

## Node API
```js
// within node.js script
const { bootstrap } = require('@hungry/babel-preset-cli')
bootstrap()

// or more meaningful alias
const { enableRuntimeTranspilation } = require('@hungry/babel-preset-cli')
enableRuntimeTranspilation({
  matcher: (file: string) => boolean,
  extensions: [".ts", ".tsx", ".jsx", ...],
  presets: []
})
```

### Why I would need a `node` API for this
I had some issues with `@babel/register` in context of monorepo and multiple different presets. I did not want to each time build sources for my `node` libraries, so only answer was to enable runtime transpilation, however after preparing some stuff to `opensource` I had an issue with multiple presets. `enableRuntimeTranspilation` works similar to `@babel/register` but exposes `matcher` for file - you are in charge what would be transpiled, not any `babel` magic.
