"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { tingkat: "Ringan", jumlah: 25 },
  { tingkat: "Sedang", jumlah: 15 },
  { tingkat: "Berat", jumlah: 5 },
]

export function TingkatPelanggaran() {
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
