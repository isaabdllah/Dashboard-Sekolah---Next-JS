"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { api } from "@/lib/api"

interface TrendData {
  bulan: string
  jumlah: number
}

interface TrenPelanggaranProps {
  refreshKey?: number
}

export function TrenPelanggaran({ refreshKey }: TrenPelanggaranProps) {
  const [data, setData] = useState<TrendData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all violations for trend analysis
        const violations = await api.getPelanggaran()
        
        // Generate monthly trend data for the last 6 months
        const currentDate = new Date()
        const monthlyData: TrendData[] = []
        
        for (let i = 5; i >= 0; i--) {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
          const monthName = date.toLocaleDateString('id-ID', { month: 'short' })
          const year = date.getFullYear()
          const month = date.getMonth()
          
          // Count violations for this month
          const monthlyCount = violations.filter(violation => {
            const violationDate = new Date(violation.tanggal)
            return violationDate.getFullYear() === year && violationDate.getMonth() === month
          }).length
          
          monthlyData.push({
            bulan: monthName,
            jumlah: monthlyCount
          })
        }
        
        setData(monthlyData)
      } catch (error) {
        console.error('Error fetching trend data:', error)
        // Fallback data
        const fallbackData = [
          { bulan: 'Feb', jumlah: 0 },
          { bulan: 'Mar', jumlah: 0 },
          { bulan: 'Apr', jumlah: 0 },
          { bulan: 'Mei', jumlah: 0 },
          { bulan: 'Jun', jumlah: 0 },
          { bulan: 'Jul', jumlah: 0 },
        ]
        setData(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [refreshKey])

  if (loading) {
    return (
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Tren Pelanggaran</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[350px] flex items-center justify-center">
            <div>Loading chart data...</div>
          </div>
        </CardContent>
      </Card>
    )
  }
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Tren Pelanggaran</CardTitle>
        <CardDescription>
          Perkembangan jumlah pelanggaran per bulan
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bulan" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="jumlah" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={{ fill: "#ef4444" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
