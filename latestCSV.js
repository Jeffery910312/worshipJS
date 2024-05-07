// 服务器端代码（Node.js）
const express = require('express');
const { readdir, statSync, readFileSync } = require('fs');
const { join } = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
const dataDirectory = './data/'; // 数据目录路径

app.get('/latestCSV', (req, res) => {
  readdir(dataDirectory, (err, files) => {
    if (err) {
      console.error('Failed to read directory:', err);
      res.status(500).send('Failed to read directory');
      return;
    }

    let csvFiles = files.filter(file => file.endsWith('.csv'));
    if (csvFiles.length === 0) {
      res.status(404).send('No CSV files found in the directory');
      return;
    }

    let latestFile = '';
    let latestMTime = 0;
    csvFiles.forEach(file => {
      const filePath = join(dataDirectory, file);
      const stats = statSync(filePath);
      if (stats.mtimeMs > latestMTime) {
        latestMTime = stats.mtimeMs;
        latestFile = file;
      }
    });

    if (latestFile) {
      const csvContent = readFileSync(join(dataDirectory, latestFile), 'utf8');
      const htmlFormattedContent = csvContent.replace(/\n/g, ',');
      res.send(htmlFormattedContent);
    } else {
      res.status(404).send('Failed to determine the latest CSV file');
    }
  });
});
app.listen(5500, () => {
  console.log('Server is running on port 5500');
});
