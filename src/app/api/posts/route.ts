import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response("User ID is required", {
      status: 400,
    });
  }

  const data = await fetch(
    "https://jsonplaceholder.typicode.com/posts?userId=" + userId
  );
  const posts = await data.json();

  return new Response(JSON.stringify(posts), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const res = await request.json();
   
  // Check insertion bdd
  // etc....
  // on retourne une erreur si le post n'a pas été inséré OU existe déjà

  return Response.json({
    message: "Post created",
    post: res,
  });
}
