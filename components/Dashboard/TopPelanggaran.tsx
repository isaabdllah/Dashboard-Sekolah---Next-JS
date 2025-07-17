"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api"

interface TopViolatorData {
  siswa: string
  kelas: string
  jumlah: number
}

interface TopPelanggaranProps {
  refreshKey?: number
}

export function TopPelanggaran({ refreshKey }: TopPelanggaranProps) {
  const [data, setData] = useState<TopViolatorData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all violations to calculate top violators
        const violations = await api.getPelanggaran()
        
        if (violations.length === 0) {
          setData([])
          return
        }

        const violatorCounts: { [key: string]: { nama: string, kelas: string, count: number } } = {}
        
        violations.forEach((violation: any) => {
          const key = violation.siswa.nis
          if (violatorCounts[key]) {
            violatorCounts[key].count++
          } else {
            violatorCounts[key] = {
              nama: violation.siswa.nama,
              kelas: typeof violation.siswa.kelas === 'string' 
                ? violation.siswa.kelas 
                : violation.siswa.kelas?.nama || 'Unknown',
              count: 1
            }
          }
        })

        const topViolators = Object.values(violatorCounts)
          .sort((a, b) => b.count - a.count)
          .slice(0, 5) // Top 5 violators
          .map(violator => ({
            siswa: violator.nama,
            kelas: violator.kelas,
            jumlah: violator.count
          }))

        setData(topViolators)
      } catch (error) {
        console.error('Error fetching top violators data:', error)
        setData([])
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
          <CardTitle>Top 5 Siswa Pelanggaran</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <div>Loading data...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (data.length === 0) {
    return (
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Top 5 Siswa Pelanggaran</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <div className="text-gray-500">Tidak ada data pelanggaran</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top 5 Siswa Pelanggaran</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 text-sm font-medium">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-medium">{item.siswa}</p>
                  <p className="text-xs text-gray-500">{item.kelas}</p>
                </div>
              </div>
              <div className="text-sm font-medium text-red-600">
                {item.jumlah} kali
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
