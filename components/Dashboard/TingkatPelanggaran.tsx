"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { api } from "@/lib/api"

interface ViolationLevelData {
  tingkat: string
  jumlah: number
}

interface TingkatPelanggaranProps {
  refreshKey?: number
}

export function TingkatPelanggaran({ refreshKey }: TingkatPelanggaranProps) {
  const [data, setData] = useState<ViolationLevelData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await api.getDashboardStats()
        // Use real violation level distribution data from API
        const levelData = stats.violationLevelDistribution?.map((item: any) => ({
          tingkat: item.tingkat,
          jumlah: item.count
        })) || []

        // Ensure all levels are represented (even with 0 counts)
        const allLevels = ['RINGAN', 'SEDANG', 'BERAT']
        const completeData = allLevels.map(level => {
          const existing = levelData.find((item: ViolationLevelData) => item.tingkat === level)
          return existing || { tingkat: level, jumlah: 0 }
        })

        setData(completeData)
      } catch (error) {
        console.error('Error fetching violation level data:', error)
        // Fallback data
        setData([
          { tingkat: "RINGAN", jumlah: 0 },
          { tingkat: "SEDANG", jumlah: 0 },
          { tingkat: "BERAT", jumlah: 0 }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [refreshKey])

  if (loading) {
    return (
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Tingkat Pelanggaran</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[300px] flex items-center justify-center">
            <div>Loading chart data...</div>
          </div>
        </CardContent>
      </Card>
    )
  }
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Tingkat Pelanggaran</CardTitle>
        <CardDescription>
          Distribusi pelanggaran berdasarkan tingkat
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tingkat" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="jumlah" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
