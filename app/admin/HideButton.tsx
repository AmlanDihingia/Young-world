'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useTransition } from 'react'

export default function HideButton({ id, isHidden, onToggle }: { id: string, isHidden: boolean, onToggle: (id: string, newStatus: boolean) => Promise<any> }) {
    const [isPending, startTransition] = useTransition()

    const handleToggle = () => {
        const action = isHidden ? 'unhide' : 'hide';
        if (window.confirm(`Are you sure you want to ${action} this community?`)) {
            startTransition(async () => {
                await onToggle(id, !isHidden)
            })
        }
    }

    return (
        <button 
            onClick={handleToggle}
            disabled={isPending}
            className={`inline-flex items-center justify-center p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={isHidden ? "Unhide Community" : "Hide Community"}
        >
            {isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
    )
}
