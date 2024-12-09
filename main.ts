import { AuthenticateUser, SignupUser } from "./authenticate.ts";

if (import.meta.main) {
  await SignupUser("cum", "pentadragon")
  await AuthenticateUser("cum", "pentadragon")
}
