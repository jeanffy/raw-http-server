export async function handler(req, res) {
  return {
    status: 200,
    body: {
      url: `${req.method} ${req.url}`,
      name: 'raw http server',
    },
  };
}
