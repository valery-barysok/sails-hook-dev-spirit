# sails-hook-dev-spirit

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Node.js Version][node-image]][node-url]

[![Build Status][travis-image]][travis-url]
[![Dependency Status][dependencies-image]][dependencies-url]
[![devDependency Status][dev-dependencies-image]][dev-dependencies-url]
[![Coverage Status][coveralls-image]][coveralls-url]

[![NPM][npm-image]][npm-url]

A Sails hook that provides diagnostic / debugging information during development.

Based on [sails-hook-dev](https://github.com/balderdashy/sails-hook-dev)

![](http://i.imgur.com/3xJDAXr.png)

> ###### Note
>
> The diagnostic routes exposed by this hook will work when your app is in development mode (i.e. `NODE_ENV` != "production")

## Install

In your Sails project:

```
npm install sails-hook-dev-spirit --save
```




## Use

##### See all options
[http://localhost:1337/dev](http://localhost:1337/dev)

##### See all available routes
[http://localhost:1337/dev/routes](http://localhost:1337/dev/routes)

##### See session of currently logged-in user
[http://localhost:1337/dev/session](http://localhost:1337/dev/session)

##### See actual versions of dependencies in `node_modules`
[http://localhost:1337/dev/dependencies](http://localhost:1337/dev/dependencies)

##### See current memory usage
[http://localhost:1337/dev/memory](http://localhost:1337/dev/memory)


## License
MIT &copy; 2015 Valery Barysok, Mike McNeil

[npm-version-image]: https://img.shields.io/npm/v/sails-hook-dev-spirit.svg?style=flat-square
[npm-downloads-image]: https://img.shields.io/npm/dm/sails-hook-dev-spirit.svg?style=flat-square
[npm-image]: https://nodei.co/npm/sails-hook-dev-spirit.png?downloads=true&downloadRank=true&stars=true
[npm-url]: https://npmjs.org/package/sails-hook-dev-spirit
[travis-image]: https://img.shields.io/travis/valery-barysok/sails-hook-dev-spirit/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/valery-barysok/sails-hook-dev-spirit
[dependencies-image]: https://david-dm.org/valery-barysok/sails-hook-dev-spirit.svg?style=flat-square
[dependencies-url]: https://david-dm.org/valery-barysok/sails-hook-dev-spirit
[dev-dependencies-image]: https://david-dm.org/valery-barysok/sails-hook-dev-spirit/dev-status.svg?style=flat-square
[dev-dependencies-url]: https://david-dm.org/valery-barysok/sails-hook-dev-spirit#info=devDependencies
[coveralls-image]: https://img.shields.io/coveralls/valery-barysok/sails-hook-dev-spirit/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/valery-barysok/sails-hook-dev-spirit?branch=master
[node-image]: https://img.shields.io/node/v/sails-hook-dev-spirit.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[gitter-join-chat-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-channel-url]: https://gitter.im/valery-barysok/sails-hook-dev-spirit
