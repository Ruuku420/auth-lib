import { assertEquals, assertNotEquals } from "@std/assert";
import { AuthenticateUser, SignupUser } from "./authenticate.ts";

Deno.test(async function createTest() {
  assertEquals(await SignupUser("ruuku", "smile!"), { type: "success" });
});

Deno.test(async function authenticateTest() {
  assertNotEquals(await AuthenticateUser("ruuku", "smile!"), {
    type: "login_failure",
  });
});
