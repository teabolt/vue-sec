// CommonJS format imports and exports
const http = require('http');
const querystring = require('querystring');

const db = require('./db');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
  console.log(`[${req.method}] request at ${req.url}`);

  // TODO: validate URL endpoint
  switch (req.method) {
    case 'GET':
      try {
        const reviews = await db.getReviews();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(reviews));
      } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end();
      }
      break;
    case 'POST':
      const data = [];
      req.on('data', (chunk) => {
        data.push(chunk);
      });
      req.on('end', () => {
        const formdata = data.join('');
        const review = querystring.parse(formdata);
        console.log(`Got review: ${JSON.stringify(review)}`);
        if (!review) {
          res.statusCode = 400;
          res.end();
        } else {
          db.addReview(review);
          res.statusCode = 200;
          res.end();
        }
      });
      break;
    default:
      res.statusCode = 405;
      res.end();
      break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
