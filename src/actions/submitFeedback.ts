'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export type FeedbackState = {
    success?: boolean
    message?: string
    errors?: {
        type?: string[]
        message?: string[]
        mood?: string[]
    }
}

export async function submitFeedback(prevState: FeedbackState, formData: FormData): Promise<FeedbackState> {
    const type = formData.get('type') as string
    const message = formData.get('message') as string
    const mood = formData.get('mood') as string
    const category = formData.get('category') as string

    // Simple validation
    const errors: any = {}
    if (!type) errors.type = ['Selecione um tipo de mensagem.']
    if (!message || message.trim().length < 5) errors.message = ['Escreva pelo menos 5 caracteres.']

    if (Object.keys(errors).length > 0) {
        return { success: false, errors }
    }

    try {
        const { error } = await supabase
            .from('submissions')
            .insert({
                type,
                message,
                mood: mood || null,
                category: category || null,
            })

        if (error) {
            console.error('Supabase error:', error)
            return { success: false, message: 'Houve um problema ao salvar seu desabafo. Tente novamente.' }
        }

        revalidatePath('/')
        return { success: true, message: 'Obrigado por compartilhar! Sua identidade foi preservada.' }
    } catch (err) {
        console.error('Server error:', err)
        return { success: false, message: 'Erro interno. Tente novamente mais tarde.' }
    }
}
