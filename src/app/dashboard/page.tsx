'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { MetricsCards } from '@/components/dashboard/metrics-cards'
import { FunnelChart } from '@/components/dashboard/funnel-chart'
import { LeadsChart } from '@/components/dashboard/leads-chart'
import { LeadsTable } from '@/components/dashboard/leads-table'
import { PeriodSelector } from '@/components/dashboard/period-selector'
import { RefreshCw } from 'lucide-react'

export type Period = 'today' | 'yesterday' | '7d' | '14d' | '30d' | 'all' | 'custom'

export default function DashboardPage() {
    const [period, setPeriod] = useState<Period>('7d')
    const [customDates, setCustomDates] = useState<{ start: Date; end: Date } | null>(null)
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
    const [isRefreshing, setIsRefreshing] = useState(false)

    // Auto-refresh a cada 30 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setLastUpdate(new Date())
        }, 30000)

        return () => clearInterval(interval)
    }, [])

    const handleRefresh = () => {
        setIsRefreshing(true)
        setLastUpdate(new Date())
        setTimeout(() => setIsRefreshing(false), 500)
    }

    const getTimeSinceUpdate = () => {
        const seconds = Math.floor((new Date().getTime() - lastUpdate.getTime()) / 1000)
        if (seconds < 60) return `${seconds}s`
        const minutes = Math.floor(seconds / 60)
        return `${minutes}min`
    }

    return (
        <div className="min-h-screen bg-zinc-50">
            {/* Header */}
            <header className="bg-white border-b border-zinc-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-zinc-900">Fonte da Juventude</h1>
                            <p className="text-sm text-zinc-500 mt-1">Dashboard de Analytics</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <PeriodSelector
                                period={period}
                                onPeriodChange={setPeriod}
                                customDates={customDates}
                                onCustomDatesChange={setCustomDates}
                            />
                            <button
                                onClick={handleRefresh}
                                className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                                disabled={isRefreshing}
                            >
                                <RefreshCw className={`w-5 h-5 text-zinc-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Metrics Cards */}
                <MetricsCards period={period} customDates={customDates} lastUpdate={lastUpdate} />

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <FunnelChart period={period} customDates={customDates} lastUpdate={lastUpdate} />
                    <LeadsChart period={period} customDates={customDates} lastUpdate={lastUpdate} />
                </div>

                {/* Leads Table */}
                <div className="mt-6">
                    <LeadsTable period={period} customDates={customDates} lastUpdate={lastUpdate} />
                </div>
            </main>

            {/* Footer */}
            <footer className="text-center py-4 text-sm text-zinc-500">
                Atualizado há {getTimeSinceUpdate()}
            </footer>
        </div>
    )
}
