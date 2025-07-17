"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { api } from "@/lib/api"

interface GenderData {
  name: string
  value: number
  color: string
}

export function GenderRatioChart() {
  const [data, setData] = useState<GenderData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await api.getDashboardStats()
        // Transform gender distribution data
        const genderData = stats.genderDistribution?.map((item: any, index: number) => ({
          name: item.gender === 'L' ? 'Laki-laki' : 'Perempuan',
          value: item.count || item._count || 0,
          color: item.gender === 'L' ? "#3b82f6" : "#ef4444"
        })) || [
          { name: "Laki-laki", value: 0, color: "#3b82f6" },
          { name: "Perempuan", value: 0, color: "#ef4444" }
        ]
        setData(genderData)
      } catch (error) {
        console.error('Error fetching gender data:', error)
        // Fallback data
        setData([
          { name: "Laki-laki", value: 0, color: "#3b82f6" },
          { name: "Perempuan", value: 0, color: "#ef4444" }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Rasio Jenis Kelamin</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
        <CardContent>
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
        <CardTitle>Rasio Jenis Kelamin</CardTitle>
        <CardDescription>
          Perbandingan siswa laki-laki dan perempuan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
