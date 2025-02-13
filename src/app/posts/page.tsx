import { Metadata } from "next";
import PostList from "./PostList";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Nouveaux Posts",
    description: "Liste des posts",
};

export default async function PostsPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?userId=1");
  const posts = await response.json();

  console.log('PostsPage', posts);

  if (!response.ok) {
    notFound();
  }

  return (
    <div className="space-y-4">
        <div>
          <Link href="/posts/new" className="text-blue-500">Créer un post</Link>
        </div>
        <div>
          <Link href="/posts/new-safe" className="text-blue-500">Créer un post avec next-safe-action</Link>
        </div>
        <PostList posts={posts} />
    </div>
  );
}