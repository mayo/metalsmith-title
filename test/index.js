var assert = require('assert');
var exec = require('child_process').exec;
var equal = require('assert-dir-equal');
var path = require('path');
var Metalsmith = require('metalsmith');
var title = require('..');

describe('metalsmith-title', function () {

	before(function (done) {
		exec('rm -rf test/fixtures/*/build', done);
	});

	it('should not replace origin title', function (done) {
		var m = Metalsmith('test/fixtures/meta');
		m.use(title()).build(function (err, files) {
			if (err) return done(err);
			assert.equal('origin title', files['preserve.md'].title);
			done();
		});
	});

	it('should use first H1 title from HTML', function (done) {
		var m = Metalsmith('test/fixtures/meta');
		m.use(title()).build(function (err, files) {
			if (err) return done(err);
			assert.equal('This is a Title from HTML', files['html.html'].title);
			done();
		});
	});

	it('should use first H1 title from markdown', function (done) {
		var m = Metalsmith('test/fixtures/meta');
		m.use(title()).build(function (err, files) {
			if (err) return done(err);
			assert.equal('First H1 title from markdown', files['markdown.md'].title);
			done();
		});
	});

	it('should detect first title and remove it', function (done) {
		var m = Metalsmith('test/fixtures/remove');
		m.use(title({ remove: true })).build(function (err, files) {
			if (err) return done(err);

			assert.equal('Title', files['remove_html.html'].title);
			assert.equal('title', files['remove_md.md'].title);

      equal('test/fixtures/remove/expected', 'test/fixtures/remove/build');

			done();
		});
	});

});
