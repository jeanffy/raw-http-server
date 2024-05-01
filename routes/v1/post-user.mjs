import { verifyAccessToken, verifyClientToken } from '../../authentication.mjs';

export async function handler(req, res, body) {
  const clientTokenresponse = verifyClientToken(req);
  if (clientTokenresponse !== undefined) {
    return clientTokenresponse;
  }

  const accessTokenResponse = verifyAccessToken(req);
  if (accessTokenResponse !== undefined) {
    return accessTokenResponse;
  }

  return {
    status: 204,
    body,
  };
}
