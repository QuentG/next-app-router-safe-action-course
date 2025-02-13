'use client'

import { safeCreatePost } from '@/lib/safe-actions/safe-create-post.action'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NewSafePost() {
  const { result, execute, isExecuting, hasErrored } = useAction(safeCreatePost);
  const router = useRouter();

  useEffect(() => {
    if (result.data?.redirect) {
      router.push('/posts');
    }
  }, [result, router])

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Créer un nouveau post</h1>
      
      <form action={execute} className="space-y-4">
        {result.serverError && (
          <p className="text-red-500">{result.serverError}</p>
        )}

        {hasErrored && (
          <p className="text-red-500">Une erreur est survenue lors de la création du post</p>
        )}
        
        <div>
          <label htmlFor="title" className="block mb-2">
            Titre
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full p-2 border rounded"
            disabled={isExecuting}
          />
        </div>

        <div>
          <label htmlFor="body" className="block mb-2">
            Contenu
          </label>
          <textarea
            id="body"
            name="body"
            required
            rows={5}
            className="w-full p-2 border rounded"
            disabled={isExecuting}
          />
        </div>

        <button
            type="submit"
            disabled={isExecuting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
            {isExecuting ? '⏳ Création...' : 'Créer le post'}
        </button>
      </form>
    </div>
  )
}