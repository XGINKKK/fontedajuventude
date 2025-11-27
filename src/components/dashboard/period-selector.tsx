'use client'

import { useState } from 'react'
import { Period } from '@/app/dashboard/page'
import { Calendar, ChevronDown } from 'lucide-react'

interface PeriodSelectorProps {
    period: Period
    onPeriodChange: (period: Period) => void
    customDates: { start: Date; end: Date } | null
    onCustomDatesChange: (dates: { start: Date; end: Date } | null) => void
}

export function PeriodSelector({
    period,
    onPeriodChange,
    customDates,
    onCustomDatesChange,
}: PeriodSelectorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [showCustomPicker, setShowCustomPicker] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const periods = [
        { value: 'today' as Period, label: 'Hoje' },
        { value: 'yesterday' as Period, label: 'Ontem' },
        { value: '7d' as Period, label: 'Últimos 7 dias' },
        { value: '14d' as Period, label: 'Últimos 14 dias' },
        { value: '30d' as Period, label: 'Últimos 30 dias' },
        { value: 'all' as Period, label: 'Todo período' },
        { value: 'custom' as Period, label: 'Personalizado' },
    ]

    const handlePeriodSelect = (value: Period) => {
        if (value === 'custom') {
            setShowCustomPicker(true)
        } else {
            onPeriodChange(value)
            setIsOpen(false)
            setShowCustomPicker(false)
        }
    }

    const handleCustomDateApply = () => {
        if (startDate && endDate) {
            onCustomDatesChange({
                start: new Date(startDate),
                end: new Date(endDate),
            })
            onPeriodChange('custom')
            setIsOpen(false)
            setShowCustomPicker(false)
        }
    }

    const getSelectedLabel = () => {
        if (period === 'custom' && customDates) {
            const start = customDates.start.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
            const end = customDates.end.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
            return `${start} - ${end}`
        }
        return periods.find((p) => p.value === period)?.label || 'Selecionar período'
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
            >
                <Calendar className="w-4 h-4 text-zinc-600" />
                <span className="text-sm font-medium text-zinc-700">{getSelectedLabel()}</span>
                <ChevronDown className={`w-4 h-4 text-zinc-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-zinc-200 rounded-lg shadow-lg z-20">
                        {!showCustomPicker ? (
                            <div className="py-2">
                                {periods.map((p) => (
                                    <button
                                        key={p.value}
                                        onClick={() => handlePeriodSelect(p.value)}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-zinc-50 transition-colors ${period === p.value ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-zinc-700'
                                            }`}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="p-4">
                                <h3 className="text-sm font-semibold text-zinc-900 mb-3">Período personalizado</h3>

                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs text-zinc-600 mb-1">Data inicial</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs text-zinc-600 mb-1">Data final</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setShowCustomPicker(false)}
                                            className="flex-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors"
                                        >
                                            Voltar
                                        </button>
                                        <button
                                            onClick={handleCustomDateApply}
                                            disabled={!startDate || !endDate}
                                            className="flex-1 px-3 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Aplicar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
