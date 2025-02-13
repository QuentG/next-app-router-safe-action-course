"use client";

import Link from "next/link"

export const MainComponent = () => {
    console.log('MainComponent');

    return (
        <div className="text-center">
        <p className="text-2xl font-semibold">Next Course ! 🚀</p>
        <p>Server actions focused</p>

        <div>
            <Link href="/posts" className="text-blue-500">Voir les posts</Link>
        </div>

        <div>
            <Link href="/posts/new" className="text-blue-500">Créer un post</Link>
        </div>

        <div>
            <Link href="/posts/new-safe" className="text-blue-500">Créer un post avec next-safe-action</Link>
        </div>
        </div>
    )
}