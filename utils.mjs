export async function getBody(req) {
  return new Promise((resolve, reject) => {
    const bodyBuffer = [];
    req.on('data', chunk => {
      bodyBuffer.push(chunk);
    });
    req.on('end', () => {
      try {
        const bodyStr = Buffer.concat(bodyBuffer).toString();
        const body = JSON.parse(bodyStr);
        resolve(body);
      } catch (error) {
        reject(error);
      }
    })
  });
}

export function respond404(res, method, url) {
  console.log(`<-- ${method} ${url} 404 not found`);
  res.writeHead(404, { 'content-type': 'application/json' });
  res.write(`{ "message": "Unhandled URL ${method} ${url}" }`);
  res.end();
}

export function respond500(error, res, method, url) {
  console.error(`<-- ${method} ${url} 500`, error);
  res.writeHead(500, { 'content-type': 'application/json' });
  res.write('{ "message": "error" }');
  res.end();
}
