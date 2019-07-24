const { extname } = require('path');

const isMarkdown = filename => /\.md|\.markdown/.test(extname(filename));
const isHtml = filename => /\.html?/.test(extname(filename));
const MARKDOWN = /^ *# *([^\n]+?) *#* *(?:\n+|$)/;
const HTML = /<h1[^>]*>([^<>]+)<\/h1>/i;
const findTitle = filename => (isMarkdown(filename) ? MARKDOWN : HTML);
const getTitle = (data, filename) => {
  const heading = data.contents.toString().match(findTitle(filename));
  return (heading)
    ? heading[1]
    : null;
};
const getContentsWithoutTitle = (data, filename) => data
  .contents.toString().replace(findTitle(filename), '');
const shouldAddTitle = (data, filename) => !(
  data.title
  || !(isMarkdown(filename) || isHtml(filename))
);
const update = (files, options) => Object.keys(files).map((filename) => {
  const data = files[filename];
  if (shouldAddTitle(data, filename)) {
    data.title = getTitle(data, filename);

    if (options.remove) {
      data.contents = getContentsWithoutTitle(data, filename);
    }
  }

  return data;
});

/**
 * A Metalsmith plugin that add title automatically
 *
 * @return {Function}
 */
function plugin(options) {
  return (files, metalsmith, done) => {
    // eslint-disable-next-line no-param-reassign
    files = update(files, options || {});
    setImmediate(done);
  };
}

module.exports = plugin;
