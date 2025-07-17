"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { api } from "@/lib/api"

interface ClassData {
  kelas: string
  jumlah: number
}

export function SiswaChart() {
  const [data, setData] = useState<ClassData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await api.getDashboardStats()
        // Transform class distribution data
        const classData = stats.classDistribution?.map((item: any) => ({
          kelas: item.name || item.nama || 'Unknown',
          jumlah: item.count || item._count || 0
        })) || []
        setData(classData)
      } catch (error) {
        console.error('Error fetching class data:', error)
        // Fallback to empty array
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
          <CardTitle>Jumlah Siswa Per Kelas</CardTitle>
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
        <CardTitle>Jumlah Siswa Per Kelas</CardTitle>
        <CardDescription>
          Distribusi siswa di setiap kelas
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="kelas" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="jumlah" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
