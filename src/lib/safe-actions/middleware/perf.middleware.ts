import { createMiddleware } from "next-safe-action";

export const perfMiddleware = createMiddleware().define(
  async ({ next, clientInput, metadata }) => {
    console.debug("LOGGING MIDDLEWARE");
    const startTime = performance.now();

    // On attend que le .action() de la safe-action soit terminé.
    const result = await next();
    const endTime = performance.now();

    console.table({
      result,
      clientInput,
      metadata,
      duration: endTime - startTime + " ms",
    });

    // And then return the result of the awaited action.
    return result;
  }
);
