const fs = require('fs');
const zlib = require('zlib');

const inputFile = process.argv[2];

if (!inputFile) {
  console.error('Please provide an input HTML file.');
  process.exit(1);
}

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    process.exit(1);
  }

  zlib.deflate(data, (err, buffer) => {
    if (err) {
      console.error('Compression error:', err);
      process.exit(1);
    }

    const base64 = buffer.toString('base64');
    const url = `https://itty.bitty.site/#/${base64}`;
    console.log(url);
  });
});

