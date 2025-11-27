'use client'

import { useState, useEffect } from 'react'
import { Period } from '@/app/dashboard/page'
import { supabase } from '@/lib/supabase'
import { Search, Download, ExternalLink, CheckCircle, Clock } from 'lucide-react'

interface Lead {
    id: string
    nome: string
    whatsapp: string
    criado_em: string
    idade_faixa: string | null
    quantidade_sintomas: number | null
    idade_biologica: number | null
    etapa_atual: string | null
    comprou: boolean
}

export function LeadsTable({
    period,
    customDates,
    lastUpdate
}: {
    period: Period
    customDates: { start: Date; end: Date } | null
    lastUpdate: Date
}) {
    const [leads, setLeads] = useState<Lead[]>([])
    const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'bought' | 'not-bought'>('all')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 20

    useEffect(() => {
        fetchLeads()
    }, [period, customDates, lastUpdate])

    useEffect(() => {
        filterLeads()
    }, [leads, searchTerm, statusFilter])

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
                const defaultRange = new Date(today)
                defaultRange.setDate(defaultRange.getDate() - 7)
                return { start: defaultRange, end: now }
        }
    }

    const fetchLeads = async () => {
        setIsLoading(true)
        const dateRange = getDateRange()

        try {
            let query = supabase
                .from('leads')
                .select(`
          id,
          nome,
          whatsapp,
          criado_em,
          quiz_respostas (
            idade_faixa,
            sinais_desgaste
          ),
          quiz_resultados (
            idade_biologica,
            quantidade_sintomas
          ),
          funil_etapas (
            etapa_atual
          ),
          compras (
            status
          )
        `)
                .order('criado_em', { ascending: false })

            if (dateRange) {
                query = query
                    .gte('criado_em', dateRange.start.toISOString())
                    .lte('criado_em', dateRange.end.toISOString())
            }

            const { data, error } = await query

            if (error) throw error

            const formattedLeads: Lead[] = data.map((lead: any) => ({
                id: lead.id,
                nome: lead.nome,
                whatsapp: lead.whatsapp,
                criado_em: lead.criado_em,
                idade_faixa: lead.quiz_respostas?.[0]?.idade_faixa || null,
                quantidade_sintomas: lead.quiz_respostas?.[0]?.sinais_desgaste?.length || 0,
                idade_biologica: lead.quiz_resultados?.[0]?.idade_biologica || null,
                etapa_atual: lead.funil_etapas?.[0]?.etapa_atual || null,
                comprou: lead.compras?.some((c: any) => c.status === 'aprovado') || false,
            }))

            setLeads(formattedLeads)
        } catch (error) {
            console.error('Erro ao buscar leads:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const filterLeads = () => {
        let filtered = leads

        // Filtro de busca
        if (searchTerm) {
            filtered = filtered.filter(
                (lead) =>
                    lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    lead.whatsapp.includes(searchTerm)
            )
        }

        // Filtro de status
        if (statusFilter === 'bought') {
            filtered = filtered.filter((lead) => lead.comprou)
        } else if (statusFilter === 'not-bought') {
            filtered = filtered.filter((lead) => !lead.comprou)
        }

        setFilteredLeads(filtered)
        setCurrentPage(1)
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const formatWhatsApp = (whatsapp: string) => {
        const cleaned = whatsapp.replace(/\D/g, '')
        if (cleaned.length === 11) {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
        }
        return whatsapp
    }

    const openWhatsApp = (whatsapp: string) => {
        const cleaned = whatsapp.replace(/\D/g, '')
        window.open(`https://wa.me/55${cleaned}`, '_blank')
    }

    const exportCSV = () => {
        const headers = ['Data', 'Nome', 'WhatsApp', 'Idade', 'Sintomas', 'Idade Biológica', 'Etapa', 'Status']
        const rows = filteredLeads.map((lead) => [
            formatDate(lead.criado_em),
            lead.nome,
            lead.whatsapp,
            lead.idade_faixa || '',
            lead.quantidade_sintomas?.toString() || '0',
            lead.idade_biologica?.toString() || '',
            lead.etapa_atual || '',
            lead.comprou ? 'Comprou' : 'Não comprou',
        ])

        const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `leads_${new Date().toISOString().split('T')[0]}.csv`
        link.click()
    }

    const totalPages = Math.ceil(filteredLeads.length / itemsPerPage)
    const paginatedLeads = filteredLeads.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-zinc-900 mb-6">Leads Capturados</h2>
                <div className="animate-pulse space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-12 bg-zinc-200 rounded"></div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold text-zinc-900">Leads Capturados</h2>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    {/* Search */}
                    <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nome ou WhatsApp..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-zinc-200 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="px-4 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="all">Todos</option>
                        <option value="bought">Compraram</option>
                        <option value="not-bought">Não compraram</option>
                    </select>

                    {/* Export */}
                    <button
                        onClick={exportCSV}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Exportar
                    </button>
                </div>
            </div>

            {filteredLeads.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-zinc-500">
                        {searchTerm || statusFilter !== 'all'
                            ? 'Nenhum lead encontrado com os filtros aplicados.'
                            : 'Ainda não há leads capturados.'}
                    </p>
                </div>
            ) : (
                <>
                    {/* Mobile View - Cards */}
                    <div className="lg:hidden space-y-4">
                        {paginatedLeads.map((lead) => (
                            <div key={lead.id} className="border border-zinc-200 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="font-bold text-zinc-900">{lead.nome}</h3>
                                        <p className="text-sm text-zinc-500">{formatDate(lead.criado_em)}</p>
                                    </div>
                                    {lead.comprou ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <Clock className="w-5 h-5 text-yellow-500" />
                                    )}
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-zinc-600">WhatsApp:</span>
                                        <button
                                            onClick={() => openWhatsApp(lead.whatsapp)}
                                            className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium"
                                        >
                                            {formatWhatsApp(lead.whatsapp)}
                                            <ExternalLink className="w-3 h-3" />
                                        </button>
                                    </div>

                                    {lead.idade_faixa && (
                                        <div className="flex justify-between">
                                            <span className="text-zinc-600">Idade:</span>
                                            <span className="text-zinc-900">{lead.idade_faixa}</span>
                                        </div>
                                    )}

                                    {lead.idade_biologica && (
                                        <div className="flex justify-between">
                                            <span className="text-zinc-600">Idade Biológica:</span>
                                            <span className="text-zinc-900">{lead.idade_biologica} anos</span>
                                        </div>
                                    )}

                                    {lead.etapa_atual && (
                                        <div className="flex justify-between">
                                            <span className="text-zinc-600">Etapa:</span>
                                            <span className="text-zinc-900">{lead.etapa_atual}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop View - Table */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-zinc-200">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Data</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Nome</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">WhatsApp</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Idade</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Sintomas</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Idade Biol.</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Etapa</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedLeads.map((lead) => (
                                    <tr key={lead.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                                        <td className="py-3 px-4 text-sm text-zinc-600">{formatDate(lead.criado_em)}</td>
                                        <td className="py-3 px-4 text-sm font-medium text-zinc-900">{lead.nome}</td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => openWhatsApp(lead.whatsapp)}
                                                className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                                            >
                                                {formatWhatsApp(lead.whatsapp)}
                                                <ExternalLink className="w-3 h-3" />
                                            </button>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-zinc-600">{lead.idade_faixa || '-'}</td>
                                        <td className="py-3 px-4 text-sm text-zinc-600">{lead.quantidade_sintomas || 0}</td>
                                        <td className="py-3 px-4 text-sm text-zinc-600">
                                            {lead.idade_biologica ? `${lead.idade_biologica} anos` : '-'}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-zinc-600">{lead.etapa_atual || '-'}</td>
                                        <td className="py-3 px-4">
                                            {lead.comprou ? (
                                                <span className="inline-flex items-center gap-1 text-sm text-green-600 font-medium">
                                                    <CheckCircle className="w-4 h-4" />
                                                    Comprou
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-sm text-yellow-600 font-medium">
                                                    <Clock className="w-4 h-4" />
                                                    Não comprou
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-6">
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 rounded-lg border border-zinc-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50"
                            >
                                Anterior
                            </button>

                            <div className="flex gap-1">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1
                                                ? 'bg-emerald-500 text-white'
                                                : 'border border-zinc-200 hover:bg-zinc-50'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 rounded-lg border border-zinc-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50"
                            >
                                Próximo
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
