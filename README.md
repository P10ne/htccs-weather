# Awesome HTC Project Stub

## Table of contents
- [Tech stack](https://gitlab.htc-cs.com/frontend/stubs/pug#tech-stack)
- [Postcss plugins](https://gitlab.htc-cs.com/frontend/stubs/pug#postcss-plugins)
- [Project Structure](https://gitlab.htc-cs.com/frontend/stubs/pug#project-structure)
- [npm scripts](https://gitlab.htc-cs.com/frontend/stubs/pug#npm-scripts)
- [Features](https://gitlab.htc-cs.com/frontend/stubs/pug#features)
    - [New Page](https://gitlab.htc-cs.com/frontend/stubs/pug#new-page)
    - [Fonts](https://gitlab.htc-cs.com/frontend/stubs/pug#fonts)
    - [SVG](https://gitlab.htc-cs.com/frontend/stubs/pug#svg)

## Tech stack
 - `pug`
 - `babel`
 - `postcss`
 - `webapck`
 - `json-server`
 - `eslint and stylelint`
 - `pre-commit hooks`

## Postcss plugins
- [postcss-import](https://github.com/postcss/postcss-import)
- [postcss-url](https://github.com/postcss/postcss-url)
- [postcss-nested](https://github.com/postcss/postcss-nested)
- [postcss-calc](https://github.com/postcss/postcss-calc)
- [postcss-mixins](https://github.com/postcss/postcss-mixins)
- [postcss-for](https://github.com/antyakushev/postcss-for)
- [postcss-each](https://github.com/outpunk/postcss-each)
- [postcss-simple-vars](https://github.com/postcss/postcss-simple-vars)
- [postcss-custom-media](https://github.com/postcss/postcss-custom-media)
- [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties)


## Project Structure
```
|-- config                         // project config folder
|  |-- helpers.js                    // helper functions
|  |-- pages.js                      // app pages
|  |-- webpack.common.js             // common webpack config
|  |-- webpack.dev.js                // extend common config for dev build
|  |-- webpack.prod.js               // extend common config for prod build

|-- server                        // server mocking client-server interraction
|  |-- db.json                      // data base. see https://github.com/typicode/json-server

|-- src                           // source code
|  |-- css                          //
|  |  |-- index.css                 // styles entry point
|  |-- fonts                        //
|  |  |-- some font folder          //
|  |  |  |-- index.css                 // font css entry point
|  |  |  |-- font itself               //
|  |-- images                       //
|  |  |-- svg-sprite                // svg sprite sources
|  |-- html                         // template, use template engine Pug
|  |  |-- blocks                    // reused blocks
|  |  |-- laoyts                    // page layouts
|  |  |-- pages                     // page templates
|  |-- js                           //
|  |  |-- index.js                  // app entry point
|  |  |-- polyfills.js              // polyfills
|  |-- static                       // some static files

|-- .browserslistrc                 // browserslist config
|-- .editorconfig                   //
|-- .eslintrc                       // eslint configuration
|-- .gitignore                      //
|-- babel.config.js                 // babel configuration
|-- build.js                        // build production script
|-- package.json                    //
|-- postcss.config.js               // postcss plugins initializations
|-- README.md                       //
|-- start.js                        // build development script
|-- stylelint.config.js             // configuration
|-- webpack.config.js               // webpack configuration entry point
|-- yarn.lock

|-- build                         // build folder
|  |-- assets                       // browser assembled assets
|  |  |-- css                       //
|  |  |-- fonts                     //
|  |  |-- images                    //
|  |  |-- js                        //
|  |-- static                       // some static files
|  |-- index.html                   //
```

## npm scripts
- `npm start or npm run start` - assemble dev build and launch dev server at http://localhost:8080/
- `npm run start-server` - launch json-server at http://localhost:3000/
- `npm run build` - assemble production build
- `npm run lint` - code style check
- `npm run lint-js` - js code style check
- `npm run lint-css` - css code style check
- `npm run sprite` - generate svg sprite, path to source files ./src/images/svg-sprite, path to the result file
./src/images/svg-sprite-img.svg

## Features

### New Page
Add a new page to config.
```
|-- config                         // project config folder
|  |-- pages.js                      // app pages
```
Example:
```
module.exports = [
    {
        filename: 'index.html',
        inject: 'body',
        template: './src/html/pages/index.pug'
    }, {
        filename: 'contacts.html',
        inject: 'body',
        template: './src/html/pages/contacts.pug'
    }
];
```

Add page template to pages.
```
|-- src                           // source code
|  |-- html                         // template, use template engine Pug
|  |  |-- pages                     // page templates
```

Example:
```
extends ../layouts/layout
block main
    |Контакты
```

__NOTE!__
Need to use `block main`. This will connect block to layout.
```
|-- src                           // source code
|  |-- html                         // template, use template engine Pug
|  |  |-- laoyts                    // page layouts
```

### Fonts
Add your font to `fonts` directory.
```
|-- src                           // source code
|  |-- fonts                        //
|  |  |-- some font folder          //
|  |  |  |-- index.css                 // font css entry point
|  |  |  |-- font itself               //
```

Add `@font-face` to `fonts/../index.css` like this:
```
@font-face {
    font-family: 'latomedium';
    src: url('latomedium.eot');
    src:
        url('latomedium.eot?#iefix') format('embedded-opentype'),
        url('latomedium.woff2') format('woff2'),
        url('latomedium.woff') format('woff'),
        url('latomedium.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
```

Import your font to `src/css/index.pcss`.

### SVG
Optimize svg in [svgomg](https://jakearchibald.github.io/svgomg/).
Add your svg to `src/html/blocks/svg-sprite.pug` like this:
```
symbol(viewBox="0 0 24 24" id="group")
    use(xlink:href="#group_a")
    defs
        path(id="group_a" d="M0 0h6v6H0V0z")
```
Use this svg in your code.
```
svg
    use(xlink:href= '#group')
```
