# es6Migrate (ES5 => ES6)
CLI tool for migrating ES5 codebases to ES6 (node.js  v7+ required)

![](http://g.recordit.co/KUHCs0Snyz.gif)

###### Optional file extension renaming, ex: `.js` to `.es6.js`.
###### Optional camel casing of file names, ex: `Camel-case` or `CamelCase` to `camelCase`.
###### Uses jscodeshift codemods to run migration tasks.

* [5to6-codemod](https://github.com/5to6/5to6-codemod)
* [js-codemod](https://github.com/cpojer/js-codemod)
* [prettier](https://github.com/prettier/prettier)
* [eslint](https://github.com/eslint/eslint)

# Migration tasks:
* (amd) Transform AMD style modules to ES6 import/export.
* (cjs) Transform CommonJS style require() calls to ES6 import statements.
* (noStrict) Remove "use strict" statements.
* (noVar) Replace all var calls to use let or const.
* (templateLiteral) Replaces string concatenation with template literals.
* (arrowFunction) Transforms callbacks only when it can guarantee not breaking this context in the function


## Usage:
TEMPORARY: (=> jscodeshift needs to be installed globally with -g flag)

###### Install jscodeshift globally:

`npm i -g jscodeshift`

###### Navigate to the root of the folder that you want to migrate install es6migrate locally:

`npm i es6migrate`

###### Run es6migrate and follow instructions.

`es6migrate`
