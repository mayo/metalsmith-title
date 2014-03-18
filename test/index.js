var assert = require('assert');
var exec = require('child_process').exec;
var Metalsmith = require('metalsmith');
var title = require('..');

describe('metalsmith-title', function () {

	before(function (done) {
		exec('rm -rf test/fixtures/*/build', done);
	});

	it('should not replace origin title', function (done) {
		var m = Metalsmith('test/fixtures');
		m.use(title()).build(function (err, files) {
			if (err) return done(err);
			assert.equal('origin title', files['preserve.md'].title);
			done();
		});
	});

	it('should use first H1 title from HTML', function (done) {
		var m = Metalsmith('test/fixtures');
		m.use(title()).build(function (err, files) {
			if (err) return done(err);
			assert.equal('This is a Title from HTML', files['html.html'].title);
			done();
		});
	});

	it('should use first H1 title from markdown', function (done) {
		var m = Metalsmith('test/fixtures');
		m.use(title()).build(function (err, files) {
			if (err) return done(err);
			assert.equal('First H1 title from markdown', files['markdown.md'].title);
			done();
		});
	});
});