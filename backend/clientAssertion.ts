// utils/createClientAssertion.ts
import { SignJWT, importJWK } from "jose";

export async function createClientAssertion({
  clientId,
  tokenEndpoint,
  privateKey, // your JWK string
  alg,
}: {
  clientId: string;
  tokenEndpoint: string;
  privateKey: string;
  alg: string;
}) {

  let jwk: any;
  try {
    jwk = JSON.parse(Buffer.from(privateKey, "base64").toString("utf-8"));
  } catch {
    jwk = JSON.parse(privateKey); // if already JSON
  }

  const key = await importJWK(jwk, alg);

  const now = Math.floor(Date.now() / 1000);

  return await new SignJWT({
    sub: clientId,
    iss: clientId,
    aud: tokenEndpoint,
  })
    .setIssuedAt(now)
    .setExpirationTime(now + 300) // 5 minutes
    .setJti(crypto.randomUUID())
    .setProtectedHeader({ alg })
    .sign(key);
}
