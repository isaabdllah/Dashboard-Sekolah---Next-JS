"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Terlambat", value: 15, color: "#f59e0b" },
  { name: "Tidak mengerjakan tugas", value: 12, color: "#ef4444" },
  { name: "Tidak berseragam", value: 8, color: "#3b82f6" },
  { name: "Berkelahi", value: 3, color: "#dc2626" },
  { name: "Membolos", value: 7, color: "#6b7280" },
]

export function TipePelanggaran() {
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
