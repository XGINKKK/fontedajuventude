'use client'

import { useState, useEffect } from 'react'
import { Period } from '@/app/dashboard/page'
import { supabase } from '@/lib/supabase'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface DailyData {
    date: string
    visitantes: number
    leads: number
    vendas: number
}

export function LeadsChart({
    period,
    customDates,
    lastUpdate
}: {
    period: Period
    customDates: { start: Date; end: Date } | null
    lastUpdate: Date
}) {
    const [data, setData] = useState<DailyData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [chartPeriod, setChartPeriod] = useState<'7d' | '14d' | '30d'>('7d')

    useEffect(() => {
        fetchChartData()
    }, [chartPeriod, lastUpdate])

    const fetchChartData = async () => {
        setIsLoading(true)
        const now = new Date()
        const days = chartPeriod === '7d' ? 7 : chartPeriod === '14d' ? 14 : 30
        const startDate = new Date(now)
        startDate.setDate(startDate.getDate() - days)

        try {
            // Buscar dados por dia
            const { data: leadsPorDia } = await supabase
                .from('leads_por_dia')
                .select('*')
                .gte('dia', startDate.toISOString().split('T')[0])
                .order('dia', { ascending: true })

            if (leadsPorDia) {
                const chartData: DailyData[] = []

                // Preencher todos os dias, mesmo sem dados
                for (let i = 0; i < days; i++) {
                    const date = new Date(startDate)
                    date.setDate(date.getDate() + i)
                    const dateStr = date.toISOString().split('T')[0]

                    const dayData = leadsPorDia.find(d => d.dia === dateStr)

                    chartData.push({
                        date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
                        visitantes: 0, // Precisaríamos buscar de funil_etapas
                        leads: dayData?.total_leads || 0,
                        vendas: dayData?.total_compras || 0,
                    })
                }

                setData(chartData)
            }
        } catch (error) {
            console.error('Erro ao buscar dados do gráfico:', error)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-zinc-900 mb-6">Leads por Dia</h2>
                <div className="h-80 flex items-center justify-center">
                    <div className="animate-pulse w-full h-full bg-zinc-100 rounded"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-zinc-900">Leads por Dia</h2>

                <div className="flex gap-2">
                    {(['7d', '14d', '30d'] as const).map((p) => (
                        <button
                            key={p}
                            onClick={() => setChartPeriod(p)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${chartPeriod === p
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                                }`}
                        >
                            {p === '7d' ? '7 dias' : p === '14d' ? '14 dias' : '30 dias'}
                        </button>
                    ))}
                </div>
            </div>

            {data.length === 0 ? (
                <div className="h-80 flex items-center justify-center">
                    <p className="text-zinc-500">Ainda não há dados suficientes para exibir o gráfico.</p>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="date" stroke="#71717a" fontSize={12} />
                        <YAxis stroke="#71717a" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="leads"
                            stroke="#10b981"
                            strokeWidth={2}
                            name="Leads"
                            dot={{ fill: '#10b981', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="vendas"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            name="Vendas"
                            dot={{ fill: '#8b5cf6', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}
