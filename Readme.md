
# metalsmith-title

  A Metalsmith plugin that automatically add page title from first heading in processed file

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

## CLI Usage

  Install via npm and then add the `metalsmith-title` key to your `metalsmith.json`:

```json
{
  "plugins": {
    "metalsmith-title": true
  }
}
```

## License

  MIT