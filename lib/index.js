var debug = require('debug')('metalsmith-title');
var extname = require('path').extname;
var basename = require('path').basename;
var dirname = require('path').dirname;
var fs = require('fs');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * A Metalsmith plugin that add title automatically
 *
 * @return {Function}
 */

function plugin(options) {
  options = options || {};

  return function (files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function (file) {
      var data = files[file];
      if (data.title) return; // skip existing

      var re = null;

      if (markdown(file)) {
        re = new RegExp(/^ *# *([^\n]+?) *#* *(?:\n+|$)/);
      }

      if (html(file)) {
        re = new RegExp(/<h1[^>]*>([^<>]+)<\/h1>/i);
      }

      if (!re) return; //make sure we have a valid regular expression

      debug("Processing file %s", file);

      var heading = data.contents.toString().match(re);
      data.title = (heading) ? heading[1] : null;

      //remove title if requested
      if (options.remove) {
        data.contents = new Buffer(data.contents.toString().replace(re, ''));
      }

      files[file] = data;
    });
  };
}

/**
 * Check if a `file` is markdown.
 *
 * @param {String} file
 * @return {Boolean}
 */

function markdown(file) {
  return /\.md|\.markdown/.test(extname(file));
}

/**
 * Check if a `file` is html.
 *
 * @param {String} file
 * @return {Boolean}
 */

function html(file) {
  return /\.html?/.test(extname(file));
}
