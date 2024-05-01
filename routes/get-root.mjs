export async function handler(req, res) {
  return {
    status: 200,
    body: {
      name: 'raw http server',
      version: 'v1',
    },
  };
}
