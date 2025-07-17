"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/Layout/AppLayout"
import { PelanggaranTable } from "@/components/Pelanggaran/PelanggaranTable"
import { AddPelanggaranDialog } from "@/components/Pelanggaran/AddPelanggaranDialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api, Pelanggaran } from "@/lib/api"
import { Search, Plus, Filter, Download } from "lucide-react"

export default function PelanggaranPage() {
  const [pelanggaran, setPelanggaran] = useState<Pelanggaran[]>([])
  const [filteredPelanggaran, setFilteredPelanggaran] = useState<Pelanggaran[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const loadPelanggaran = async () => {
      try {
        const data = await api.getPelanggaran()
        setPelanggaran(data)
        setFilteredPelanggaran(data)
      } catch (error) {
        console.error("Error loading pelanggaran:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPelanggaran()
  }, [])

  useEffect(() => {
    const filtered = pelanggaran.filter(p =>
      p.siswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.siswa.nis.includes(searchTerm) ||
      p.jenisPelanggaran.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.siswa.kelas.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredPelanggaran(filtered)
  }, [searchTerm, pelanggaran])

  const handleAddPelanggaran = () => {
    console.log("Add pelanggaran")
  }

  const handleFilter = () => {
    console.log("Filter pelanggaran")
  }

  const handleExport = () => {
    console.log("Export pelanggaran")
  }

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
            <h2 className="text-3xl font-bold tracking-tight">Manajemen Pelanggaran</h2>
            <p className="text-muted-foreground">
              Kelola data pelanggaran siswa dan tindakan yang diambil.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <AddPelanggaranDialog />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Pelanggaran</CardTitle>
            <CardDescription>
              Total {pelanggaran.length} pelanggaran tercatat.
            </CardDescription>
            <div className="flex space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari pelanggaran..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="outline" onClick={handleFilter}>
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <PelanggaranTable data={filteredPelanggaran} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
