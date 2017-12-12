const fs = require('fs');
const glob = require('glob');
const YAML = require('yaml-js');
const extendify = require('extendify');

glob("src/**/*.{yaml,yml}", function (er, files) {
  const contents = files.map(f => {
    return YAML.load(fs.readFileSync(f).toString());
  });
  const extend = extendify({
    inPlace: false,
    isDeep: true
  });

  const merged = contents.reduce(extend);
  console.log("Generating swagger.yaml, swagger.json");
  fs.existsSync("dist") || fs.mkdirSync("dist");
  fs.writeFile("dist/swagger.yaml", YAML.dump(merged));
  fs.writeFile("dist/swagger.json", JSON.stringify(merged, null, 2));
});
