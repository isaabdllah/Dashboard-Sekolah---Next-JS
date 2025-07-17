"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const topPelanggaran = [
  { siswa: "Ahmad Fadli", kelas: "X-A", jumlah: 5 },
  { siswa: "Budi Santoso", kelas: "X-B", jumlah: 4 },
  { siswa: "Citra Dewi", kelas: "XI-IPA-1", jumlah: 3 },
  { siswa: "Dian Sari", kelas: "XI-IPA-2", jumlah: 3 },
  { siswa: "Eko Prasetyo", kelas: "XII-IPA-1", jumlah: 2 },
]

export function TopPelanggaran() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top 5 Siswa Pelanggaran</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topPelanggaran.map((item, index) => (
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
