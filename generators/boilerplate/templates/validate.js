const fs = require('fs');
const http = require('http');

const swaggerSpec = fs.readFileSync('dist/swagger.json', 'utf8');

const req = http.request({
  hostname: 'online.swagger.io',
  port: 80,
  path: '/validator/debug',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(swaggerSpec)
  }
}, (response) => {
  // Continuously update stream with data
  let body = '';
  response.on('data', function (d) {
    body += d;
  });

  response.on('end', function () {
    if (response.statusCode !== 200) {
      console.error('Failed to send Swagger Spec');
      process.exit(1);
    }

    // Data reception is done, do whatever with it!
    const parsed = JSON.parse(body);
    if (parsed.schemaValidationMessages) {
      parsed.schemaValidationMessages.forEach((item) => {
        if (item.level === 'error') {
          console.error(parsed);
          process.exit(2);
        }
      })
    }
  });
});

req.write(swaggerSpec);
req.end();
