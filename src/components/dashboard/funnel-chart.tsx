'use client'

import { useState, useEffect } from 'react'
import { Period } from '@/app/dashboard/page'
import { supabase } from '@/lib/supabase'

interface FunnelStep {
    name: string
    count: number
    percentage: number
}

export function FunnelChart({
    period,
    customDates,
    lastUpdate
}: {
    period: Period
    customDates: { start: Date; end: Date } | null
    lastUpdate: Date
}) {
    const [steps, setSteps] = useState<FunnelStep[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchFunnelData()
    }, [period, customDates, lastUpdate])

    const getDateRange = () => {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        switch (period) {
            case 'today':
                return { start: today, end: now }
            case 'yesterday':
                const yesterday = new Date(today)
                yesterday.setDate(yesterday.getDate() - 1)
                return { start: yesterday, end: today }
            case '7d':
                const sevenDays = new Date(today)
                sevenDays.setDate(sevenDays.getDate() - 7)
                return { start: sevenDays, end: now }
            case '14d':
                const fourteenDays = new Date(today)
                fourteenDays.setDate(fourteenDays.getDate() - 14)
                return { start: fourteenDays, end: now }
            case '30d':
                const thirtyDays = new Date(today)
                thirtyDays.setDate(thirtyDays.getDate() - 30)
                return { start: thirtyDays, end: now }
            case 'custom':
                return customDates || { start: today, end: now }
            case 'all':
                return null
            default:
                return { start: sevenDays, end: now }
        }
    }

    const fetchFunnelData = async () => {
        setIsLoading(true)
        const dateRange = getDateRange()

        try {
            const stepFields = [
                { field: 'step_1_em', name: 'Step 1 (Capa)' },
                { field: 'step_2_em', name: 'Step 2 (Idade)' },
                { field: 'step_3_em', name: 'Step 3 (Desejo)' },
                { field: 'step_4_em', name: 'Step 4 (Região)' },
                { field: 'step_5_em', name: 'Step 5 (Sintomas)' },
                { field: 'step_6_em', name: 'Step 6 (Estresse)' },
                { field: 'step_7_em', name: 'Step 7 (Tentativas)' },
                { field: 'step_8_em', name: 'Step 8 (Tempo)' },
                { field: 'step_9_em', name: 'Step 9 (Altura/Peso)' },
                { field: 'step_10_em', name: 'Step 10 (Compromisso)' },
                { field: 'step_11_em', name: 'Step 11 (WhatsApp)' },
                { field: 'resultado_em', name: 'Resultado' },
                { field: 'vendas_em', name: 'Página de Vendas' },
                { field: 'checkout_em', name: 'Checkout' },
                { field: 'comprou_em', name: 'Comprou' },
            ]

            const counts = await Promise.all(
                stepFields.map(async ({ field, name }) => {
                    let query = supabase
                        .from('funil_etapas')
                        .select('id', { count: 'exact', head: true })
                        .not(field, 'is', null)

                    if (dateRange) {
                        query = query
                            .gte(field, dateRange.start.toISOString())
                            .lte(field, dateRange.end.toISOString())
                    }

                    const { count } = await query
                    return { name, count: count || 0 }
                })
            )

            const total = counts[0]?.count || 1
            const funnelSteps = counts.map(({ name, count }) => ({
                name,
                count,
                percentage: (count / total) * 100,
            }))

            setSteps(funnelSteps)
        } catch (error) {
            console.error('Erro ao buscar dados do funil:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const getBarColor = (percentage: number) => {
        if (percentage >= 70) return 'bg-green-500'
        if (percentage >= 40) return 'bg-yellow-500'
        return 'bg-red-500'
    }

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-zinc-900 mb-6">Funil Visual</h2>
                <div className="space-y-3">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-8 bg-zinc-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-zinc-900 mb-6">Funil Visual</h2>

            {steps.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-zinc-500">
                        Ainda não há dados. Os números aparecerão quando as primeiras pessoas entrarem no funil.
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    {steps.map((step, index) => (
                        <div key={index} className="group">
                            <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-zinc-700 font-medium">{step.name}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-zinc-900 font-bold">{step.count.toLocaleString()}</span>
                                    <span className="text-zinc-500 w-12 text-right">
                                        {step.percentage.toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                            <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${getBarColor(step.percentage)}`}
                                    style={{ width: `${step.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
