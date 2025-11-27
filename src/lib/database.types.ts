export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            compras: {
                Row: {
                    comprado_em: string
                    id: string
                    lead_id: string
                    metodo_pagamento: string | null
                    status: string
                    transacao_id: string | null
                    valor: number
                }
                Insert: {
                    comprado_em?: string
                    id?: string
                    lead_id: string
                    metodo_pagamento?: string | null
                    status?: string
                    transacao_id?: string | null
                    valor: number
                }
                Update: {
                    comprado_em?: string
                    id?: string
                    lead_id?: string
                    metodo_pagamento?: string | null
                    status?: string
                    transacao_id?: string | null
                    valor?: number
                }
            }
            funil_etapas: {
                Row: {
                    atualizado_em: string
                    checkout_em: string | null
                    comprou_em: string | null
                    etapa_atual: string
                    id: string
                    lead_id: string | null
                    resultado_em: string | null
                    session_id: string
                    step_1_em: string | null
                    step_10_em: string | null
                    step_11_em: string | null
                    step_2_em: string | null
                    step_3_em: string | null
                    step_4_em: string | null
                    step_5_em: string | null
                    step_6_em: string | null
                    step_7_em: string | null
                    step_8_em: string | null
                    step_9_em: string | null
                    vendas_em: string | null
                }
                Insert: {
                    atualizado_em?: string
                    checkout_em?: string | null
                    comprou_em?: string | null
                    etapa_atual: string
                    id?: string
                    lead_id?: string | null
                    resultado_em?: string | null
                    session_id: string
                    step_1_em?: string | null
                    step_10_em?: string | null
                    step_11_em?: string | null
                    step_2_em?: string | null
                    step_3_em?: string | null
                    step_4_em?: string | null
                    step_5_em?: string | null
                    step_6_em?: string | null
                    step_7_em?: string | null
                    step_8_em?: string | null
                    step_9_em?: string | null
                    vendas_em?: string | null
                }
                Update: {
                    atualizado_em?: string
                    checkout_em?: string | null
                    comprou_em?: string | null
                    etapa_atual?: string
                    id?: string
                    lead_id?: string | null
                    resultado_em?: string | null
                    session_id?: string
                    step_1_em?: string | null
                    step_10_em?: string | null
                    step_11_em?: string | null
                    step_2_em?: string | null
                    step_3_em?: string | null
                    step_4_em?: string | null
                    step_5_em?: string | null
                    step_6_em?: string | null
                    step_7_em?: string | null
                    step_8_em?: string | null
                    step_9_em?: string | null
                    vendas_em?: string | null
                }
            }
            leads: {
                Row: {
                    criado_em: string
                    dispositivo: string | null
                    id: string
                    nome: string
                    origem: string | null
                    utm_campaign: string | null
                    utm_medium: string | null
                    whatsapp: string
                }
                Insert: {
                    criado_em?: string
                    dispositivo?: string | null
                    id?: string
                    nome: string
                    origem?: string | null
                    utm_campaign?: string | null
                    utm_medium?: string | null
                    whatsapp: string
                }
                Update: {
                    criado_em?: string
                    dispositivo?: string | null
                    id?: string
                    nome?: string
                    origem?: string | null
                    utm_campaign?: string | null
                    utm_medium?: string | null
                    whatsapp?: string
                }
            }
            quiz_respostas: {
                Row: {
                    altura_cm: number | null
                    id: string
                    idade_faixa: string | null
                    lead_id: string
                    nivel_estresse: string | null
                    pergunta_compromisso: string | null
                    peso_kg: number | null
                    principal_desejo: string | null
                    regiao_incomoda: string | null
                    respondido_em: string
                    sinais_desgaste: string[] | null
                    tempo_disponivel: string | null
                    tentativas_anteriores: string | null
                }
                Insert: {
                    altura_cm?: number | null
                    id?: string
                    idade_faixa?: string | null
                    lead_id: string
                    nivel_estresse?: string | null
                    pergunta_compromisso?: string | null
                    peso_kg?: number | null
                    principal_desejo?: string | null
                    regiao_incomoda?: string | null
                    respondido_em?: string
                    sinais_desgaste?: string[] | null
                    tempo_disponivel?: string | null
                    tentativas_anteriores?: string | null
                }
                Update: {
                    altura_cm?: number | null
                    id?: string
                    idade_faixa?: string | null
                    lead_id?: string
                    nivel_estresse?: string | null
                    pergunta_compromisso?: string | null
                    peso_kg?: number | null
                    principal_desejo?: string | null
                    regiao_incomoda?: string | null
                    respondido_em?: string
                    sinais_desgaste?: string[] | null
                    tempo_disponivel?: string | null
                    tentativas_anteriores?: string | null
                }
            }
            quiz_resultados: {
                Row: {
                    calculado_em: string
                    classificacao_imc: string | null
                    diferenca_idade: number | null
                    id: string
                    idade_biologica: number | null
                    idade_real_estimada: number | null
                    imc: number | null
                    lead_id: string
                    quantidade_sintomas: number | null
                }
                Insert: {
                    calculado_em?: string
                    classificacao_imc?: string | null
                    diferenca_idade?: number | null
                    id?: string
                    idade_biologica?: number | null
                    idade_real_estimada?: number | null
                    imc?: number | null
                    lead_id: string
                    quantidade_sintomas?: number | null
                }
                Update: {
                    calculado_em?: string
                    classificacao_imc?: string | null
                    diferenca_idade?: number | null
                    id?: string
                    idade_biologica?: number | null
                    idade_real_estimada?: number | null
                    imc?: number | null
                    lead_id?: string
                    quantidade_sintomas?: number | null
                }
            }
        }
        Views: {
            abandono_por_etapa: {
                Row: {
                    etapa_atual: string | null
                    porcentagem_abandono: number | null
                    quantidade: number | null
                }
            }
            funil_resumo: {
                Row: {
                    avancaram: number | null
                    chegaram: number | null
                    etapa: string | null
                    taxa_abandono: number | null
                    taxa_conversao: number | null
                }
            }
            leads_por_dia: {
                Row: {
                    completou_quiz: number | null
                    dia: string | null
                    taxa_conversao_geral: number | null
                    total_compras: number | null
                    total_leads: number | null
                    viu_resultado: number | null
                }
            }
            leads_sem_compra: {
                Row: {
                    criado_em: string | null
                    dispositivo: string | null
                    etapa_atual: string | null
                    id: string | null
                    nome: string | null
                    origem: string | null
                    ultima_atividade: string | null
                    utm_campaign: string | null
                    utm_medium: string | null
                    whatsapp: string | null
                }
            }
        }
        Functions: {
            calcular_idade_biologica: {
                Args: {
                    faixa_idade: string
                    sintomas: string[]
                    estresse: string
                    altura_cm: number
                    peso_kg: number
                }
                Returns: number
            }
            calcular_imc: {
                Args: {
                    altura_cm: number
                    peso_kg: number
                }
                Returns: {
                    imc: number
                    classificacao: string
                }[]
            }
            registrar_etapa: {
                Args: {
                    p_session_id: string
                    p_etapa: string
                    p_lead_id?: string
                }
                Returns: string
            }
        }
    }
}
