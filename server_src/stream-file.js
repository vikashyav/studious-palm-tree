const http = require('http');
const fs = require('fs');
const path = require('path');
// http.createServer
const server = ((req, res) => {
    const {filename = 'TERI MERI LADAYI (Full Song) Maninder Buttar feat. Tania _ Akasa _ Arvindr Khaira _ MixSingh _Jugni(240P).mp4',
      folder=''
    }= req.query;
  const filePath = path.join(folder||'videos', filename);
  // Wish Rathod-- on Instagram_ __parigomez _tiktokind(MP4).mp4
  //Garry Sandhu - Like U (TERE JAISI)- Manpreet Toor - Official Video Song- Rahul - Fresh Media Records.mp4
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.query.range || req.headers.range;
  console.log("filename", req.query.filename,"range...", range)
  if (range) {

    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    console.log("hit in range", parts, start, end)
    const chunkSize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    console.log("hit in else")
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

const port = 3000;
module.exports = server
// server.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
