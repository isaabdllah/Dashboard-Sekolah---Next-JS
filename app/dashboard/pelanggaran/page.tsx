"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/Layout/AppLayout"
import { PelanggaranTable } from "@/components/Pelanggaran/PelanggaranTable"
import { AddPelanggaranDialog } from "@/components/Pelanggaran/AddPelanggaranDialog"
import { ExportTabel } from "@/components/Pelanggaran/ExportTabel"
import { FilterTable } from "@/components/Pelanggaran/FilterTable"
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
  const [currentFilters, setCurrentFilters] = useState({
    dateRange: { start: '', end: '' },
    kelas: '',
    tingkatPelanggaran: '',
    jenisPelanggaran: '',
    status: '',
    siswa: ''
  })

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

  useEffect(() => {
    loadPelanggaran()
  }, [])

  useEffect(() => {
    const filtered = pelanggaran.filter(p =>
      p.siswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.siswa.nis.includes(searchTerm) ||
      p.jenisPelanggaran.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof p.siswa.kelas === 'string' 
        ? p.siswa.kelas.toLowerCase().includes(searchTerm.toLowerCase())
        : p.siswa.kelas?.nama?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    setFilteredPelanggaran(filtered)
  }, [searchTerm, pelanggaran])

  const handleAddPelanggaran = () => {
    // This function is now handled by the AddPelanggaranDialog component
    loadPelanggaran() // Refresh data after adding
  }

  const handleFilterChange = (filteredData: Pelanggaran[]) => {
    setFilteredPelanggaran(filteredData)
  }

  const handleFiltersChange = (filters: any) => {
    setCurrentFilters(filters)
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
            <ExportTabel data={filteredPelanggaran} filteredData={filteredPelanggaran} />
            <AddPelanggaranDialog onDataChanged={loadPelanggaran} />
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
              <FilterTable 
                data={pelanggaran}
                onFilterChange={handleFilterChange}
                currentFilters={currentFilters}
                onFiltersChange={handleFiltersChange}
              />
            </div>
          </CardHeader>
          <CardContent>
            <PelanggaranTable data={filteredPelanggaran} onDataChanged={loadPelanggaran} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
