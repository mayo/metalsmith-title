const assert = require('assert');
const { exec } = require('child_process');
const equal = require('assert-dir-equal');
const Metalsmith = require('metalsmith');
const title = require('..');

describe('metalsmith-title', () => {
  before((done) => {
    exec('rm -rf test/fixtures/*/build', done);
  });

  it('should not replace origin title', (done) => {
    const m = Metalsmith('test/fixtures/meta');
    m.use(title()).build((err, files) => {
      if (err) {
        done(err);
      } else {
        assert.equal('origin title', files['preserve.md'].title);
        done();
      }
    });
  });

  it('should use first H1 title from HTML', (done) => {
    const m = Metalsmith('test/fixtures/meta');
    m.use(title()).build((err, files) => {
      if (err) {
        done(err);
      } else {
        assert.equal('This is a Title from HTML', files['html.html'].title);
        done();
      }
    });
  });

  it('should use first H1 title from markdown', (done) => {
    const m = Metalsmith('test/fixtures/meta');
    m.use(title()).build((err, files) => {
      if (err) {
        done(err);
      } else {
        assert.equal('First H1 title from markdown', files['markdown.md'].title);
        done();
      }
    });
  });

  it('should detect first title and remove it', (done) => {
    const m = Metalsmith('test/fixtures/remove');
    m.use(title({ remove: true })).build((err, files) => {
      if (err) {
        done(err);
      } else {
        assert.equal('Title', files['remove_html.html'].title);
        assert.equal('title', files['remove_md.md'].title);

        equal('test/fixtures/remove/expected', 'test/fixtures/remove/build');

        done();
      }
    });
  });
});
