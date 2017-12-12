'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-swagger-spec:boilerplate', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/boilerplate'));
  });

  it('creates files', () => {
    assert.file([
      '.gitignore',
      'scripts/format.js',
      'scripts/generate.js',
      'scripts/validate.js',
      'src/base.yml',
      'src/definitions.yml',
      'src/paths.yml'
    ]);
  });
});
