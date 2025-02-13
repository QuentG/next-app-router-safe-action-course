'use client'

import { createPost } from '@/lib/actions/create-post.action'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'

const initialState = {
  message: '',
  errors: {}
}

export default function NewPost() {
  const [state, formAction, pending] = useActionState(createPost, initialState)
  const router = useRouter();

  useEffect(() => {
    if (state.redirect) {
      router.push("/posts");
    }
  }, [state, router])

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Créer un nouveau post</h1>
      
      <form action={formAction} className="space-y-4">
        {state.message && (
          <p className="text-red-500">{state.message}</p>
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
            disabled={pending}
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
            disabled={pending}
          />
        </div>

        <button
            type="submit"
            disabled={pending}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
            {pending ? '⏳ Création...' : 'Créer le post'}
        </button>
      </form>
    </div>
  )
}