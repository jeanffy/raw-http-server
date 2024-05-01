const validClientToken = 'some-client-token';
const validAccessToken = 'some-access-token';

const validEmail = 'demo@localhost.dev';
const validPassword = 'P4ssw0rd!';

export function verifyClientToken(req) {
  const clientToken = req.headers['x-client-token'];
  if (clientToken === undefined) {
    return { status: 422, body: { message: 'X-Client-Token needed' } };
  }
  if (clientToken !== validClientToken) {
    return { status: 403, body: { message: 'Invalid X-Client-Token' } };
  }
  return undefined;
}

export function verifyAccessToken(req) {
  const auth = req.headers.authorization;
  if (auth === undefined) {
    return { status: 422, body: { message: 'Bearer authorization needed' } };
  }
  if (!auth.startsWith('Bearer ')) {
    return { status: 401, body: { message: 'Invalid bearer authorization' } };
  }
  const accessToken = auth.slice('Bearer '.length);
  if (accessToken !== validAccessToken) {
    return { status: 403, body: { message: 'Invalid access token' } };
  }
  return undefined;
}

export function loginUser(email, password) {
  if (email === validEmail && password === validPassword) {
    return validAccessToken;
  }
  return undefined;
}
