'use client'

import { Trash2 } from 'lucide-react'
import { useTransition } from 'react'

export default function DeleteButton({ id, onDelete }: { id: string, onDelete: (id: string) => Promise<any> }) {
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this profile? This action cannot be undone.')) {
            startTransition(async () => {
                await onDelete(id)
            })
        }
    }

    return (
        <button 
            onClick={handleDelete}
            disabled={isPending}
            className={`inline-flex items-center justify-center p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Delete Community Profile"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    )
}
