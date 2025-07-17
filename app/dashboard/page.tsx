'use client'

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
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalSiswa: 0,
    totalKelas: 0,
    totalPelanggaran: 0,
    pelanggaranBulanIni: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  return (
    <AppLayout>
      <div className="space-y-6">
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
            value={stats.totalSiswa}
            icon={Users}
            description="Jumlah siswa aktif"
          />
          <StatCard
            title="Total Kelas"
            value={stats.totalKelas}
            icon={GraduationCap}
            description="Kelas yang tersedia"
          />
          <StatCard
            title="Total Pelanggaran"
            value={stats.totalPelanggaran}
            icon={AlertTriangle}
            description="Total pelanggaran tercatat"
          />
          <StatCard
            title="Bulan Ini"
            value={stats.pelanggaranBulanIni}
            icon={TrendingUp}
            description="Pelanggaran bulan ini"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <SiswaChart />
          <GenderRatioChart />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <TrenPelanggaran />
          <TopPelanggaran />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <TingkatPelanggaran />
          <TipePelanggaran />
          <BirthYearDistribution />
        </div>
      </div>
    </AppLayout>
  )
}
