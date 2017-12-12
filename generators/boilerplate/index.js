'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });

    this.option('name', {
      type: String,
      required: true,
      desc: 'Project name'
    });
  }

  writing() {
    const pkg = this.fs.readJSON(
      this.destinationPath(this.options.generateInto, 'package.json'),
      {}
    );

    extend(pkg, {
      devDependencies: {
        extendify: '^1.0.0',
        glob: '^7.1.2',
        'yaml-js': '^0.2.0'
      },
      scripts: {
        build: 'node scripts/generate.js',
        format: 'node scripts/format.js',
        pretest: 'npm run build',
        test: 'node scripts/validate.js'
      }
    });

    this.fs.writeJSON(
      this.destinationPath(this.options.generateInto, 'package.json'),
      pkg
    );

    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));

    this.fs.copyTpl(this.templatePath('base.yml'), this.destinationPath('src/base.yml'), {
      pkgTitle: this.options.name
    });
    this.fs.copy(
      this.templatePath('definitions.yml'),
      this.destinationPath('src/definitions.yml')
    );
    this.fs.copy(this.templatePath('paths.yml'), this.destinationPath('src/paths.yml'));

    this.fs.copy(
      this.templatePath('format.js'),
      this.destinationPath('scripts/format.js')
    );
    this.fs.copy(
      this.templatePath('generate.js'),
      this.destinationPath('scripts/generate.js')
    );
    this.fs.copy(
      this.templatePath('validate.js'),
      this.destinationPath('scripts/validate.js')
    );
  }
};
