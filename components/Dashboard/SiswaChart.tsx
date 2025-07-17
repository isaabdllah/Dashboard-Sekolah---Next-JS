"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { kelas: "X-A", jumlah: 32 },
  { kelas: "X-B", jumlah: 30 },
  { kelas: "XI-IPA-1", jumlah: 28 },
  { kelas: "XI-IPA-2", jumlah: 30 },
  { kelas: "XII-IPA-1", jumlah: 25 },
  { kelas: "XII-IPA-2", jumlah: 27 },
]

export function SiswaChart() {
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
