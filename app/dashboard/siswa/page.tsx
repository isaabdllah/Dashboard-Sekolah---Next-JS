"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/Layout/AppLayout"
import { AddSiswaDialog } from "@/components/Siswa/AddSiswaDialog"
import { SiswaTable } from "@/components/Siswa/SiswaTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Download } from "lucide-react"
import { api, Siswa } from "@/lib/api"

export default function SiswaPage() {
  const [siswa, setSiswa] = useState<Siswa[]>([])
  const [filteredSiswa, setFilteredSiswa] = useState<Siswa[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const loadSiswa = async () => {
    try {
      const data = await api.getSiswa()
      setSiswa(data)
      setFilteredSiswa(data)
    } catch (error) {
      console.error("Error loading siswa:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSiswa()
  }, [])

  useEffect(() => {
    const filtered = siswa.filter(s =>
      s.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.nis.includes(searchTerm) ||
      (typeof s.kelas === 'string' 
        ? s.kelas.toLowerCase().includes(searchTerm.toLowerCase())
        : s.kelas?.nama?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    setFilteredSiswa(filtered)
  }, [searchTerm, siswa])

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
            <h2 className="text-3xl font-bold tracking-tight">Manajemen Siswa</h2>
            <p className="text-muted-foreground">
              Kelola data siswa dan informasi akademik.
            </p>
          </div>
          <AddSiswaDialog onSiswaAdded={loadSiswa} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Siswa</CardTitle>
            <CardDescription>
              Total {siswa.length} siswa terdaftar.
            </CardDescription>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari siswa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </CardHeader>
          <CardContent>
            <SiswaTable data={filteredSiswa} onDataChanged={loadSiswa} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
