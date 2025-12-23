'use client'

import { useActionState, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, ThumbsUp, AlertTriangle, Lightbulb, MessageSquare, ShieldCheck, Lock } from 'lucide-react'
import { submitFeedback, type FeedbackState } from '@/actions/submitFeedback'
import { cn } from '@/lib/utils'

const MOODS = [
    { value: 'feliz', emoji: '😃', label: 'Feliz' },
    { value: 'contente', emoji: '🙂', label: 'Contente' },
    { value: 'neutro', emoji: '😐', label: 'Neutro' },
    { value: 'chateado', emoji: '😕', label: 'Chateado' },
    { value: 'bravo', emoji: '😠', label: 'Bravo' },
]

const TYPES = [
    { id: 'elogio', label: 'Elogio', icon: ThumbsUp, color: 'bg-lime-50 text-brand-lime border-brand-lime' },
    { id: 'sugestão', label: 'Sugestão', icon: Lightbulb, color: 'bg-yellow-50 text-brand-yellow border-brand-yellow' },
    { id: 'reclamação', label: 'Reclamação', icon: AlertTriangle, color: 'bg-orange-50 text-brand-orange border-brand-orange' },
    { id: 'desabafo', label: 'Desabafo', icon: MessageSquare, color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
]

const CATEGORIES = [
    'Comunicação', 'Liderança', 'Processos', 'Carga de trabalho', 'Clima organizacional', 'Outro'
]

const initialState: FeedbackState = {
    message: '',
    errors: {}
}

export function FeedbackForm() {
    const [state, action, isPending] = useActionState(submitFeedback, initialState)
    const [selectedType, setSelectedType] = useState<string>('')
    const [selectedMood, setSelectedMood] = useState<string>('')

    if (state.success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto p-8 text-center bg-white rounded-2xl shadow-xl border border-green-100"
            >
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Recebido com sucesso!</h2>
                <p className="text-gray-600 mb-6">{state.message}</p>
                <button
                    onClick={() => window.location.reload()} // Simple reset
                    className="px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                    Enviar outro
                </button>
            </motion.div>
        )
    }

    return (
        <form action={action} className="max-w-2xl mx-auto space-y-8 bg-[#fdfdfd] p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100/50">

            {/* Header Info - Removed as requested */}

            {/* Type Selection */}
            <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">Sobre o que você quer falar?</label>
                <div className="grid grid-cols-2 gap-3">
                    {TYPES.map((t) => {
                        const Icon = t.icon
                        const isSelected = selectedType === t.id
                        return (
                            <label
                                key={t.id}
                                className={cn(
                                    "cursor-pointer relative flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 group",
                                    isSelected
                                        ? t.color.replace('border-', 'border-current bg-opacity-10 ') + " " + t.color.split(' ')[0].replace('bg-', 'bg-') + "/10"
                                        : "bg-white border-gray-100 hover:border-gray-300 hover:shadow-md",
                                    isSelected ? "shadow-lg scale-[1.02] ring-1 ring-offset-2 ring-transparent" : "shadow-sm opacity-90 hover:opacity-100"
                                )}
                            >
                                <input
                                    type="radio"
                                    name="type"
                                    value={t.id}
                                    className="sr-only"
                                    onChange={() => setSelectedType(t.id)}
                                />
                                <div className={cn("p-3 rounded-full transition-colors", isSelected ? "bg-white/80" : "bg-gray-50 group-hover:bg-gray-100")}>
                                    <Icon className={cn("w-6 h-6", isSelected && "animate-bounce")} />
                                </div>
                                <span className="font-semibold text-sm tracking-wide">{t.label}</span>
                            </label>
                        )
                    })}
                </div>
                {state.errors?.type && <p className="text-red-500 text-sm">{state.errors.type}</p>}
            </div>

            {/* Mood - Optional */}
            <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700 tracking-tight">Como você está se sentindo? <span className="text-gray-400 font-normal ml-1">(Opcional)</span></label>
                <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                    {MOODS.map((m) => (
                        <label key={m.value} className="cursor-pointer group relative">
                            <input
                                type="radio"
                                name="mood"
                                value={m.value}
                                className="sr-only"
                                onChange={() => setSelectedMood(m.value)}
                            />
                            <span className={cn(
                                "block text-3xl transition-transform hover:scale-125 grayscale hover:grayscale-0",
                                selectedMood === m.value ? "grayscale-0 scale-125" : "grayscale opacity-50"
                            )}>
                                {m.emoji}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Message */}
            <div className="space-y-3">
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 tracking-tight">Sua mensagem</label>
                <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-5 py-4 rounded-2xl border-gray-200 bg-gray-50 border focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/10 transition-all resize-none shadow-sm text-gray-800 placeholder:text-gray-400 font-medium"
                    placeholder="Sinta-se seguro para compartilhar o que pensa..."
                />
                {state.errors?.message && <p className="text-red-500 text-sm">{state.errors.message}</p>}
            </div>

            {/* Category */}
            <div className="space-y-3">
                <label htmlFor="category" className="block text-sm font-bold text-gray-700 tracking-tight">Categoria <span className="text-gray-400 font-normal ml-1">(Opcional)</span></label>
                <div className="relative">
                    <select
                        name="category"
                        id="category"
                        className="w-full px-5 py-4 rounded-2xl border-gray-200 bg-gray-50 border focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/10 transition-all appearance-none font-medium text-gray-700"
                    >
                        <option value="">Selecione uma categoria...</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-brand-orange to-orange-600 text-white py-5 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-brand-orange/20 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none active:scale-[0.98]"
            >
                {isPending ? (
                    <span className="animate-pulse">Enviando confidencialmente...</span>
                ) : (
                    <>
                        Enviar para a caixinha <Send className="w-5 h-5" />
                    </>
                )}
            </button>

            {state.message && !state.success && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm text-center">
                    {state.message}
                </div>
            )}
        </form>
    )
}
