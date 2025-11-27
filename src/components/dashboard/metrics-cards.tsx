'use client'

import { useState, useEffect } from 'react'
import { Period } from '@/app/dashboard/page'
import { supabase } from '@/lib/supabase'
import { Users, UserCheck, TrendingUp, ShoppingCart, Percent, ArrowUp, ArrowDown } from 'lucide-react'

interface MetricsData {
    totalVisitantes: number
    totalLeads: number
    taxaCaptura: number
    totalVendas: number
    taxaConversao: number
    comparativo?: {
        visitantes: number
        leads: number
        vendas: number
    }
}

export function MetricsCards({
    period,
    customDates,
    lastUpdate
}: {
    period: Period
    customDates: { start: Date; end: Date } | null
    lastUpdate: Date
}) {
    const [metrics, setMetrics] = useState<MetricsData>({
        totalVisitantes: 0,
        totalLeads: 0,
        taxaCaptura: 0,
        totalVendas: 0,
        taxaConversao: 0,
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchMetrics()
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

    const fetchMetrics = async () => {
        setIsLoading(true)
        const dateRange = getDateRange()

        try {
            // Total de visitantes
            let visitantesQuery = supabase
                .from('funil_etapas')
                .select('id', { count: 'exact', head: true })
                .not('step_1_em', 'is', null)

            if (dateRange) {
                visitantesQuery = visitantesQuery
                    .gte('step_1_em', dateRange.start.toISOString())
                    .lte('step_1_em', dateRange.end.toISOString())
            }

            const { count: visitantes } = await visitantesQuery

            // Total de leads
            let leadsQuery = supabase
                .from('leads')
                .select('id', { count: 'exact', head: true })

            if (dateRange) {
                leadsQuery = leadsQuery
                    .gte('criado_em', dateRange.start.toISOString())
                    .lte('criado_em', dateRange.end.toISOString())
            }

            const { count: leads } = await leadsQuery

            // Total de vendas
            let vendasQuery = supabase
                .from('compras')
                .select('id', { count: 'exact', head: true })
                .eq('status', 'aprovado')

            if (dateRange) {
                vendasQuery = vendasQuery
                    .gte('comprado_em', dateRange.start.toISOString())
                    .lte('comprado_em', dateRange.end.toISOString())
            }

            const { count: vendas } = await vendasQuery

            const totalVisitantes = visitantes || 0
            const totalLeads = leads || 0
            const totalVendas = vendas || 0
            const taxaCaptura = totalVisitantes > 0 ? (totalLeads / totalVisitantes) * 100 : 0
            const taxaConversao = totalLeads > 0 ? (totalVendas / totalLeads) * 100 : 0

            setMetrics({
                totalVisitantes,
                totalLeads,
                taxaCaptura,
                totalVendas,
                taxaConversao,
            })
        } catch (error) {
            console.error('Erro ao buscar métricas:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const cards = [
        {
            title: 'Total de Visitantes',
            value: metrics.totalVisitantes,
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            title: 'Leads Capturados',
            value: metrics.totalLeads,
            icon: UserCheck,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
        },
        {
            title: 'Taxa de Captura',
            value: `${metrics.taxaCaptura.toFixed(1)}%`,
            icon: TrendingUp,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
        },
        {
            title: 'Vendas',
            value: metrics.totalVendas,
            icon: ShoppingCart,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            title: 'Taxa de Conversão',
            value: `${metrics.taxaConversao.toFixed(1)}%`,
            icon: Percent,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
        },
    ]

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                        <div className="h-4 bg-zinc-200 rounded w-2/3 mb-4"></div>
                        <div className="h-8 bg-zinc-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg ${card.bgColor}`}>
                            <card.icon className={`w-6 h-6 ${card.color}`} />
                        </div>
                    </div>
                    <p className="text-sm text-zinc-600 mb-1">{card.title}</p>
                    <p className="text-3xl font-bold text-zinc-900">{card.value}</p>
                </div>
            ))}
        </div>
    )
}
