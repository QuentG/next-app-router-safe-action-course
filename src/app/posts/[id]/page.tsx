// Par défault nous sommes dans le contexte du serveur.

import { Comment } from "@/types/comment"
import { Metadata } from "next"

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata(
    { params }: Props,
  ): Promise<Metadata> {
    const id = (await params).id
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => res.json())

    return {
      title: post.title,
      description: "La description de la page",
    }
  }

export default async function PostDetailPage({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const id = (await params).id

    const postDetailResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const post = await postDetailResponse.json()

    const postCommentsDetail = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.userId}/comments`)
    const comments = await postCommentsDetail.json()

    console.log("POST DETAIL PAGE SERVER COMPONENT")

    if (!postDetailResponse.ok || !postCommentsDetail.ok) {
      return <div>Erreur lors du chargement du post OU des commentaires</div>
    }

    return (
        <div className="space-y-4">
            <p className="text-2xl font-semibold">{post.title}</p>
            <p className="text-sm text-gray-500">{post.body}</p>
            <p className="text-lg font-semibold">Commentaires</p>
            {comments.map((comment: Comment) => (
                <div key={comment.id} className="w-full max-w-sm rounded-lg border p-4 shadow">
                    <p className="text-lg font-semibold">{comment.name}</p>
                    <p className="text-sm text-gray-500">{comment.body}</p>
                </div>
            ))}
        </div>
    )
  }