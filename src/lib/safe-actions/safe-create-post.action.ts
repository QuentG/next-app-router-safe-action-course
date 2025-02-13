"use server";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { perfMiddleware } from "./middleware/perf.middleware";
import { revalidatePath } from "next/cache";
import { zfd } from "zod-form-data";
import { authMiddleware } from "./middleware/auth.middleware";

const PostSchema = zfd.formData({
  title: zfd.text(z.string().min(1, "Le titre est requis")),
  body: zfd.text(z.string().min(1, "Le contenu est requis")),
});

export const safeCreatePost = createSafeActionClient()
  .schema(PostSchema)
  .use(authMiddleware)
  .use(perfMiddleware)
  .action(async ({ parsedInput, ctx }) => {
    console.debug("ACTION CREATE POST TOKEN : ", ctx.token);

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      // Ajout du userId en statique pour l'exemple
      body: JSON.stringify({ ...parsedInput, userId: 1 }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${ctx.token}`,
      },
    });

    if (!response.ok) {
      return {
        message: "Une erreur est survenue lors de la création du post",
        errors: {},
      };
    }

    // Revalidation de la page /posts (on supprime le cache de la page /posts)
    revalidatePath("/posts");

    return {
      redirect: "/posts",
    };
  });
