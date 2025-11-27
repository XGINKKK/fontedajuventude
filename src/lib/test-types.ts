import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabase = createClient<Database>('', '')

async function test() {
    const { data: lead } = await supabase
        .from('leads')
        .insert({
            nome: 'Teste',
            whatsapp: '11999999999'
        } as any)
        .select()
        .single()

    if (lead) {
        console.log(lead.id) // Se isso der erro de tipo, a inferência está quebrada
    }
}
