import { loginUser, verifyClientToken } from '../../authentication.mjs';

export async function handler(req, res, body) {
  const clientTokenresponse = verifyClientToken(req);
  if (clientTokenresponse !== undefined) {
    return clientTokenresponse;
  }

  const accessToken = loginUser(body.email, body.password);
  if (accessToken !== undefined) {
    return { status: 200, body: { accessToken } };
  }
  return { status: 401, body: {} };
}
