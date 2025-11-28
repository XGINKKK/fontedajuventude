import { supabase } from './supabase'
import { QuizAnswers } from './quiz-context'
import { Database } from './database.types'

export async function saveLead(answers: QuizAnswers): Promise<{ id: string } | null> {
    try {
        // 1. Salvar Lead
        const leadData: Database['public']['Tables']['leads']['Insert'] = {
            nome: answers.name,
            whatsapp: answers.whatsapp,
            origem: 'quiz',
            dispositivo: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
        }

        // Cast explícito no chain do Supabase para evitar erro 'never'
        const { data: leadRaw, error: leadError } = await (supabase
            .from('leads') as any)
            .insert(leadData)
            .select()
            .single()

        if (leadError) throw leadError

        const lead = leadRaw as { id: string };

        // 2. Salvar Respostas do Quiz
        const { error: answersError } = await (supabase
            .from('quiz_respostas') as any)
            .insert({
                lead_id: lead.id,
                idade_faixa: answers.ageRange,
                principal_desejo: answers.goal,
                regiao_incomoda: answers.problemArea,
                sinais_desgaste: answers.symptoms,
                nivel_estresse: answers.stressLevel,
                tentativas_anteriores: answers.previousAttempts,
                tempo_disponivel: answers.timeAvailability,
                altura_cm: parseFloat(answers.height.replace(',', '.')),
                peso_kg: parseFloat(answers.weight.replace(',', '.')),
                pergunta_compromisso: answers.commitment
            })

        if (answersError) throw answersError

        // 3. Inicializar Funil (Step 11 - Capture é onde salvamos o lead, mas ele já passou pelos outros)
        // Vamos marcar todos os steps anteriores como concluídos
        const now = new Date().toISOString()
        await (supabase.from('funil_etapas') as any).insert({
            lead_id: lead.id,
            session_id: `session_${lead.id}`, // Identificador simples
            etapa_atual: 'capture', // Capture
            step_1_em: now,
            step_2_em: now,
            step_3_em: now,
            step_4_em: now,
            step_5_em: now,
            step_6_em: now,
            step_7_em: now,
            step_8_em: now,
            step_9_em: now,
            step_10_em: now,
            step_11_em: now,
        })

        return lead
    } catch (error) {
        console.error('Erro ao salvar lead:', error)
        return null
    }
}

export async function saveQuizResult(leadId: string, result: any) {
    try {
        const { error } = await (supabase
            .from('quiz_resultados') as any)
            .insert({
                lead_id: leadId,
                imc: result.bmi,
                classificacao_imc: result.bmi < 18.5 ? 'abaixo' : result.bmi < 25 ? 'ideal' : result.bmi < 30 ? 'acima' : 'obesidade',
                idade_real_estimada: result.chronologicalAge,
                idade_biologica: result.bioAge,
                diferenca_idade: result.ageDiff,
                quantidade_sintomas: 0 // Precisaria passar isso no result
            })

        if (error) throw error

        // Atualizar funil para etapa de resultado
        await (supabase
            .from('funil_etapas') as any)
            .update({
                resultado_em: new Date().toISOString(),
                etapa_atual: 'resultado'
            })
            .eq('lead_id', leadId)

        return true
    } catch (error) {
        console.error('Erro ao salvar resultado:', error)
        return false
    }
}
