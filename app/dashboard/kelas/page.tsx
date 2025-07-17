"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/Layout/AppLayout"
import { AddKelasDialog } from "@/components/Kelas/AddKelasDialog"
import { KelasTable } from "@/components/Kelas/KelasTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { api, Kelas } from "@/lib/api"

export default function KelasPage() {
  const [kelas, setKelas] = useState<Kelas[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadKelas = async () => {
      try {
        const data = await api.getKelas()
        setKelas(data)
      } catch (error) {
        console.error("Error loading kelas:", error)
      } finally {
        setLoading(false)
      }
    }

    loadKelas()
  }, [])

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Manajemen Kelas</h2>
            <p className="text-muted-foreground">
              Kelola data kelas dan wali kelas.
            </p>
          </div>
          <AddKelasDialog />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Kelas</CardTitle>
            <CardDescription>
              Total {kelas.length} kelas terdaftar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <KelasTable data={kelas} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
