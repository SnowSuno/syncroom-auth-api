import { Hono } from "hono";

import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { login } from "./auth";

const app = new Hono().basePath("/api");


app.post("/login", zValidator("json", z.object({
  username: z.string(),
  password: z.string(),
})), async c => {
  const { username, password } = c.req.valid("json");

  const key = await login(username, password);

  return c.json({ key });
});

export { app };
