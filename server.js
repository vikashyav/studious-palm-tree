import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/app';
const stream = require("./server_src/stream-file")
import cors from "cors";
const fs = require('fs');
const path = require('path')

const app = express();
const PORT = 3000;

// Serve static files (e.g., styles, scripts)
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "web-build")));  


// app.use(express.static(path.join(__dirname, "public")));
app.use(cors()); // enable cors

const folderPath = path.join("./", 'videos');
let files;
try {
    files = fs.readdirSync(folderPath);
    console.log('Files in the folder:', files[0]);
} catch (err) {
    console.error('Error reading directory:', err);
}

app.get("/", ((req, res) => {
	const data = "This is base {/index} API. Use the respective routing-API to begin...";
	return res.status(200).send(data);
}));

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
