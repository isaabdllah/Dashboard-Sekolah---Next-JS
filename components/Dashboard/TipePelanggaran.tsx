"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { api } from "@/lib/api"

interface ViolationTypeData {
  name: string
  value: number
  color: string
}

interface TipePelanggaranProps {
  refreshKey?: number
}

const colors = ["#f59e0b", "#ef4444", "#3b82f6", "#dc2626", "#6b7280", "#10b981", "#8b5cf6"]

export function TipePelanggaran({ refreshKey }: TipePelanggaranProps) {
  const [data, setData] = useState<ViolationTypeData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all violations to calculate type distribution
        const violations = await api.getPelanggaran()
        
        if (violations.length === 0) {
          setData([])
          return
        }

        // Calculate violation type distribution
        const typeCounts: { [key: string]: number } = {}
        violations.forEach((violation: any) => {
          const type = violation.jenisPelanggaran || 'Lainnya'
          typeCounts[type] = (typeCounts[type] || 0) + 1
        })

        // Convert to chart data format
        const typeData = Object.entries(typeCounts).map(([type, count], index) => ({
          name: type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' '),
          value: count,
          color: colors[index % colors.length]
        }))

        setData(typeData)
      } catch (error) {
        console.error('Error fetching violation types data:', error)
        // Fallback data - empty array instead of sample data
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Tipe Pelanggaran</CardTitle>
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

  if (data.length === 0) {
    return (
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Tipe Pelanggaran</CardTitle>
          <CardDescription>
            Distribusi jenis pelanggaran yang terjadi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] flex items-center justify-center">
            <div className="text-gray-500">Tidak ada data pelanggaran</div>
          </div>
        </CardContent>
      </Card>
    )
  }
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Tipe Pelanggaran</CardTitle>
        <CardDescription>
          Distribusi jenis pelanggaran yang terjadi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
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
