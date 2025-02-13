"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const PostSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  body: z.string().min(1, "Le contenu est requis"),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createPost(prevState: any, formData: FormData) {
  const validatedFields = PostSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
  });

  // Simuler un délais
  // await new Promise((resolve) => setTimeout(resolve, 4000));

  if (!validatedFields.success) {
    return {
      message: "Champs invalides",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ ...validatedFields.data, userId: 1 }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      return {
        message: "Une erreur est survenue lors de la création du post",
        errors: {},
      };
    }

    // Revalidation de la page /posts (pour mettre à jour la liste des posts)
    revalidatePath("/posts");
    // Retourner un objet avec une propriété redirect
    return { redirect: "/posts" };
  } catch (error) {
    console.error(error);
    return {
      message: "Une erreur est survenue lors de la création du post",
      errors: {},
    };
  }
}
