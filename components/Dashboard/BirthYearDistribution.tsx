"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { year: "2005", count: 12 },
  { year: "2006", count: 15 },
  { year: "2007", count: 18 },
  { year: "2008", count: 25 },
  { year: "2009", count: 20 },
  { year: "2010", count: 22 },
]

export function BirthYearDistribution() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Distribusi Tahun Kelahiran</CardTitle>
        <CardDescription>
          Sebaran tahun kelahiran siswa
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
