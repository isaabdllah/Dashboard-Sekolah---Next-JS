"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { bulan: "Jan", jumlah: 8 },
  { bulan: "Feb", jumlah: 12 },
  { bulan: "Mar", jumlah: 15 },
  { bulan: "Apr", jumlah: 10 },
  { bulan: "Mei", jumlah: 18 },
  { bulan: "Jun", jumlah: 7 },
]

export function TrenPelanggaran() {
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
