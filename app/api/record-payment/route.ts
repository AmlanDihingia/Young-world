import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { transaction_id, payer_name, payer_email, amount, currency, status } = body

        const { error } = await supabase
            .from('payments')
            .insert({
                transaction_id,
                payer_name,
                payer_email,
                amount,
                currency,
                status,
            })

        if (error) throw error

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('Error recording payment:', error)
        return NextResponse.json(
            { error: 'Error recording payment' },
            { status: 500 }
        )
    }
}
