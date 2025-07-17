'use client'

import { useState, useEffect } from 'react'
import { AppLayout } from '@/components/Layout/AppLayout'
import { StatCard } from '@/components/Dashboard/StatCard'
import { SiswaChart } from '@/components/Dashboard/SiswaChart'
import { GenderRatioChart } from '@/components/Dashboard/GenderRatioChart'
import { TrenPelanggaran } from '@/components/Dashboard/TrenPelanggaran'
import { TopPelanggaran } from '@/components/Dashboard/TopPelanggaran'
import { TingkatPelanggaran } from '@/components/Dashboard/TingkatPelanggaran'
import { TipePelanggaran } from '@/components/Dashboard/TipePelanggaran'
import { BirthYearDistribution } from '@/components/Dashboard/BirthYearDistribution'
import { Users, GraduationCap, AlertTriangle, TrendingUp } from 'lucide-react'
import { api, DashboardStats } from '@/lib/api'

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Selamat datang di Dashboard Sekolah
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Siswa"
            value={stats?.overview.totalSiswa || 0}
            icon={Users}
            description="Jumlah siswa aktif"
          />
          <StatCard
            title="Total Kelas"
            value={stats?.overview.totalKelas || 0}
            icon={GraduationCap}
            description="Kelas yang tersedia"
          />
          <StatCard
            title="Total Pelanggaran"
            value={stats?.overview.totalPelanggaran || 0}
            icon={AlertTriangle}
            description="Total pelanggaran tercatat"
          />
          <StatCard
            title="Bulan Ini"
            value={stats?.overview.pelanggaranBulanIni || 0}
            icon={TrendingUp}
            description="Pelanggaran bulan ini"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <SiswaChart />
          <GenderRatioChart />
          <TrenPelanggaran />
          <TopPelanggaran />
          <TingkatPelanggaran />
          <TipePelanggaran />
          <BirthYearDistribution />
        </div>
      </div>
    </AppLayout>
  )
}
