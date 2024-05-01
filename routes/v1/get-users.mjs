import { verifyAccessToken, verifyClientToken } from '../../authentication.mjs';

const users = [
  { name: 'foo user', email: 'foo-user@localhost.dev' },
  { name: 'bar user', email: 'bar-user@localhost.dev' },
  { name: 'baz user', email: 'baz-user@localhost.dev' },
];

export async function handler(req, res) {
  const clientTokenresponse = verifyClientToken(req);
  if (clientTokenresponse !== undefined) {
    return clientTokenresponse;
  }
  const accessTokenResponse = verifyAccessToken(req);
  if (accessTokenResponse !== undefined) {
    return accessTokenResponse;
  }
  return {
    status: 200,
    body: users,
  };
}
