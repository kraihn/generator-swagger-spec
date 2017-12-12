const fs = require('fs');
const glob = require('glob');
const YAML = require('yaml-js');

glob("src/**/*.{yaml,yml}", function (er, files) {
  files.map(f => {
    fs.writeFileSync(f, YAML.dump(YAML.load(fs.readFileSync(f).toString())));
  });
});
