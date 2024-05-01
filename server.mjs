import http from 'node:http';
import url from 'node:url';
import { handler as getRootHandler } from './routes/get-root.mjs';
import { handler as getPublicV1Handler } from './routes/v1/get-public.mjs';
import { handler as postLoginV1Handler } from './routes/v1/post-login.mjs';
import { handler as getUsersV1Handler } from './routes/v1/get-users.mjs';
import { handler as postUserV1Handler } from './routes/v1/post-user.mjs';
import { getBody, respond404, respond500 } from './utils.mjs';

const handlers = [
  { route: 'GET /', run: getRootHandler },
  { route: 'GET /v1/public', run: getPublicV1Handler },
  { route: 'POST /v1/login', run: postLoginV1Handler },
  { route: 'GET /v1/users', run: getUsersV1Handler },
  { route: 'POST /v1/users', run: postUserV1Handler },
];

const server = http.createServer(async (req, res) => {
  try {
    console.log(`--> ${req.method} ${req.url}`);

    console.log('Headers:');
    console.log(req.headers);

    const handler = handlers.find(h => {
      const routePath = url.parse(req.url).pathname;
      return `${req.method} ${routePath}` === h.route;
    });

    if (handler === undefined) {
      respond404(res, req.method, req.url);
    } else {
      let body;
      if (req.method === 'POST') {
        body = await getBody(req);
        console.log('Body:');
        console.log(JSON.stringify(body, undefined, 2));
      }

      const response = await handler.run(req, res, body);
      console.log(`<-- ${req.method} ${req.url} ${response.status}`);
      res.writeHead(response.status, { 'content-type': 'application/json' });
      res.write(JSON.stringify(response.body));
      res.end();
    }
  } catch (error) {
    respond500(error, res);
  }
});

server.on('error', (error) => {
  console.error(error);
})

server.listen(3000, () => {
  console.log('Raw http sever listening port 3000');
});
