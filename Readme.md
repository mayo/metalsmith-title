[![Build Status](https://travis-ci.org/mayo/metalsmith-title.svg?branch=master)](https://travis-ci.org/mayo/metalsmith-title)

# metalsmith-title

  A Metalsmith plugin that automatically add page title from first heading in
  processed file

  This clone of metalsmith-title adds an option to remove title after detecting
  it and setting it as metadata. Useful when you want to use markdown documents
  verbatim, but have special treatments for titles in your templates, such as
  putting them inside of <header> tags.

## Installation

  $ npm install metalsmith-title

## Usage

```js
  var date = require('metalsmith-title');
  metalsmith.use(title());
```

That will add title to all

```handlebars
	<title>{{ title }}</title>
```

```js
  var date = require('metalsmith-title');
  metalsmith.use(title({ remove: true }));
```

## CLI Usage

  Install via npm and then add the `metalsmith-title` key to your
  `metalsmith.json`:

```json
  {
    "plugins": {
      "metalsmith-title": true
    }
  }
```

## License

  MIT
