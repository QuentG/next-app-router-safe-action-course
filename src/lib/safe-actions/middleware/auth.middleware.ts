import { createMiddleware } from "next-safe-action";

export const authMiddleware = createMiddleware().define(async ({ next }) => {
  console.debug("AUTH MIDDLEWARE");
  const token = "MON_TOKEN";

  if (!token) {
    throw new Error("No token found, user is not authenticated");
  }

  return next({ ctx: { token } });
});
