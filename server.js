import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/app';
const stream = require("./server_src/stream-file")
const app = express();
const PORT = 3000;

// Serve static files (e.g., styles, scripts)
app.use(express.static('public'));

const fs = require('fs');
const path = require('path')
const folderPath = path.join(__dirname, 'videos');
let files = [];
try {
    files = fs.readdirSync(folderPath);
    console.log('Files in the folder:', files[1]);
} catch (err) {
    console.error('Error reading directory:', err);
}

// Handle all GET requests
app.get('/web*', (req, res) => {
    const url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);

    // Read query parameters
    const currentParams = url.searchParams;

    const appString = renderToString(<App files={files} name="vikas" queryParams={Object.fromEntries(currentParams.entries())} />);
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>React SSR</title>
        </head>
        <body>
            <div id="root">${appString}</div>
             <script>
                window.__FILES__ = ${JSON.stringify(files)};
                window._query_ = ${JSON.stringify(Object.fromEntries(currentParams.entries()))};
            </script>
            <script src="/bundled-client.js" defer></script>
        </body>
        </html>
    `;
    res.send(html);
});

app.use("/stream", stream)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
