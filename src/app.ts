import { Hono } from "hono";

import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { login } from "./auth";
import { cors } from "hono/cors";

const app = new Hono().basePath("/api");

app.use("/api/*", cors({
  origin: ["https://syncroom.link", "http://localhost:5173"],
}));

app.post("/login", zValidator("json", z.object({
  username: z.string(),
  password: z.string(),
})), async c => {
  const { username, password } = c.req.valid("json");

  const key = await login(username, password);

  return c.json({ key });
});

export { app };
