import { encodeHex } from "jsr:@std/encoding/hex";

import { database } from "./model.ts";

const SESSION_LENGTH = 16
const textEncoder = new TextEncoder();

async function hashPassword(password: string): Promise<string> {
  const passwordBuffer = textEncoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-512", passwordBuffer);
  const hashHex = encodeHex(hashBuffer);

  return hashHex;
}

function generateSession(length: number): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  const randomValues = crypto.getRandomValues(new Uint8Array(length));

  for (let i = 0; i < length; i++) {
    result += charset[randomValues[i] % charset.length];
  }

  return result;
}

type AuthenticationResult =
  | { type: "success", session: string }
  | { type: "login_failure" };

export async function AuthenticateUser(
  username: string,
  password: string,
): Promise<AuthenticationResult> {
  const account_password: string = database?.[username]?.password_hash;

  if (account_password === undefined) {
    return { type: "login_failure" };
  }

  if (account_password === await hashPassword(password)) {
    const session = generateSession(SESSION_LENGTH)
    database[username].session = session
    
    return { type: "success", session: session };
  } else {
    return { type: "login_failure" };
  }
}

type SignupResult =
  | { type: "success" }
  | { type: "username_taken" };

export async function SignupUser(
  username: string,
  password: string
): Promise<SignupResult> {
  if (database?.[username] === undefined) {
    database[username] = { 
      password_hash: await hashPassword(password),
      session: undefined,
    }
    return { type: "success" }
  }

  return { type: "username_taken" }
}
