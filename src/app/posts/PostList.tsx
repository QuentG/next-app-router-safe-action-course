"use client";

import { Post } from "@/types/post";
import { isDefined } from "@/utils/assert";
import Link from "next/link";

type PostListProps = {
    posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
    // const [clientPosts, setClientPosts] = useState<Post[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);

    // // useCallback pour éviter de recréer la fonction
    // // à chaque rendu du composant
    // const fetchPosts = useCallback(async () => {
    //     setLoading(true);
    //     // Récupérer les posts de l'utilisateur avec l'ID 1
    //     const response = await fetch("https://jsonplaceholder.typicode.com/posts?userId=1");
    //     const posts = await response.json(); 

    //     if (!response.ok) {
    //         return;
    //     }

    //     // Simuler un délai pour voir le loading state
    //     await new Promise(resolve => setTimeout(resolve, 3000));

    //     setClientPosts(posts);
    //     setLoading(false);
    // }, []);

    // // Récupérer les posts de notre utilisateur
    // // au chargement du composant
    // useEffect(() => {
    //     fetchPosts();
    // }, [fetchPosts]);

    return (
        <div className="space-y-4 flex-1">
            <p className="text-2xl font-semibold">Liste de mes posts</p>
                {/* {loading
                    ? <PostLoadingCards /> */}
                {isDefined(posts) ? (
                    posts.map((post) => (
                        <div key={post.id} className="w-full max-w-sm rounded-lg border p-4 shadow">
                            <p className="text-lg font-semibold">{post.title}</p>
                            <p className="text-sm text-gray-500">{post.body}</p>
                            <Link href={`/posts/${post.id}`} className="text-blue-500">{"Voir l\'article"}</Link>
                        </div>
                    ))
                ) : (
                    <p>Aucun post trouvé</p>
                )}
        </div>
    );
}

export default PostList;