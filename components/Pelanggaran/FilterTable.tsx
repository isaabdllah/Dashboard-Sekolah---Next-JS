"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Filter, X, Calendar, User, AlertTriangle, BookOpen, RotateCcw } from "lucide-react"
import { Pelanggaran, Kelas, api } from "@/lib/api"

interface FilterTableProps {
  data: Pelanggaran[]
  onFilterChange: (filteredData: Pelanggaran[]) => void
  currentFilters: any
  onFiltersChange: (filters: any) => void
}

export function FilterTable({ data, onFilterChange, currentFilters, onFiltersChange }: FilterTableProps) {
  const [open, setOpen] = useState(false)
  const [kelas, setKelas] = useState<Kelas[]>([])
  const [filters, setFilters] = useState({
    dateRange: {
      start: '',
      end: ''
    },
    kelas: '',
    tingkatPelanggaran: '',
    jenisPelanggaran: '',
    status: '',
    siswa: ''
  })

  // Load kelas options
  useEffect(() => {
    const loadKelas = async () => {
      try {
        const kelasData = await api.getKelas()
        setKelas(kelasData)
      } catch (error) {
        console.error('Error loading kelas:', error)
      }
    }
    loadKelas()
  }, [])

  // Initialize filters from props
  useEffect(() => {
    if (currentFilters) {
      setFilters(currentFilters)
    }
  }, [currentFilters])

  // Get unique values for filter options
  const getUniqueValues = (field: string) => {
    const values = new Set()
    data.forEach(item => {
      if (field === 'kelas') {
        const kelasName = typeof item.siswa.kelas === 'string' 
          ? item.siswa.kelas 
          : item.siswa.kelas?.nama || ''
        if (kelasName) values.add(kelasName)
      } else if (field === 'siswa') {
        values.add(item.siswa.nama)
      } else {
        values.add(item[field as keyof Pelanggaran])
      }
    })
    return Array.from(values).sort()
  }

  const applyFilters = () => {
    let filteredData = [...data]

    // Filter by date range
    if (filters.dateRange.start && filters.dateRange.end) {
      const startDate = new Date(filters.dateRange.start)
      const endDate = new Date(filters.dateRange.end)
      filteredData = filteredData.filter(item => {
        const itemDate = new Date(item.tanggal)
        return itemDate >= startDate && itemDate <= endDate
      })
    }

    // Filter by kelas
    if (filters.kelas) {
      filteredData = filteredData.filter(item => {
        const kelasName = typeof item.siswa.kelas === 'string' 
          ? item.siswa.kelas 
          : item.siswa.kelas?.nama || ''
        return kelasName === filters.kelas
      })
    }

    // Filter by tingkat pelanggaran
    if (filters.tingkatPelanggaran) {
      filteredData = filteredData.filter(item => 
        item.tingkatPelanggaran === filters.tingkatPelanggaran
      )
    }

    // Filter by jenis pelanggaran
    if (filters.jenisPelanggaran) {
      filteredData = filteredData.filter(item => 
        item.jenisPelanggaran === filters.jenisPelanggaran
      )
    }

    // Filter by status
    if (filters.status) {
      filteredData = filteredData.filter(item => 
        item.status === filters.status
      )
    }

    // Filter by siswa
    if (filters.siswa) {
      filteredData = filteredData.filter(item => 
        item.siswa.nama === filters.siswa
      )
    }

    onFilterChange(filteredData)
    onFiltersChange(filters)
  }

  const resetFilters = () => {
    const resetFilters = {
      dateRange: { start: '', end: '' },
      kelas: '',
      tingkatPelanggaran: '',
      jenisPelanggaran: '',
      status: '',
      siswa: ''
    }
    setFilters(resetFilters)
    onFilterChange(data)
    onFiltersChange(resetFilters)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.dateRange.start && filters.dateRange.end) count++
    if (filters.kelas) count++
    if (filters.tingkatPelanggaran) count++
    if (filters.jenisPelanggaran) count++
    if (filters.status) count++
    if (filters.siswa) count++
    return count
  }

  const getActiveFiltersDisplay = () => {
    const activeFilters = []
    
    if (filters.dateRange.start && filters.dateRange.end) {
      activeFilters.push({
        key: 'dateRange',
        label: 'Tanggal',
        value: `${new Date(filters.dateRange.start).toLocaleDateString('id-ID')} - ${new Date(filters.dateRange.end).toLocaleDateString('id-ID')}`
      })
    }
    
    if (filters.kelas) {
      activeFilters.push({
        key: 'kelas',
        label: 'Kelas',
        value: filters.kelas
      })
    }
    
    if (filters.tingkatPelanggaran) {
      activeFilters.push({
        key: 'tingkatPelanggaran',
        label: 'Tingkat',
        value: filters.tingkatPelanggaran
      })
    }
    
    if (filters.jenisPelanggaran) {
      activeFilters.push({
        key: 'jenisPelanggaran',
        label: 'Jenis',
        value: filters.jenisPelanggaran
      })
    }
    
    if (filters.status) {
      activeFilters.push({
        key: 'status',
        label: 'Status',
        value: filters.status
      })
    }
    
    if (filters.siswa) {
      activeFilters.push({
        key: 'siswa',
        label: 'Siswa',
        value: filters.siswa
      })
    }
    
    return activeFilters
  }

  const removeFilter = (filterKey: string) => {
    const newFilters = { ...filters }
    if (filterKey === 'dateRange') {
      newFilters.dateRange = { start: '', end: '' }
    } else {
      (newFilters as any)[filterKey] = ''
    }
    setFilters(newFilters)
    
    // Apply filters immediately
    let filteredData = [...data]
    
    // Apply remaining filters
    if (filterKey !== 'dateRange' && newFilters.dateRange.start && newFilters.dateRange.end) {
      const startDate = new Date(newFilters.dateRange.start)
      const endDate = new Date(newFilters.dateRange.end)
      filteredData = filteredData.filter(item => {
        const itemDate = new Date(item.tanggal)
        return itemDate >= startDate && itemDate <= endDate
      })
    }
    
    if (filterKey !== 'kelas' && newFilters.kelas) {
      filteredData = filteredData.filter(item => {
        const kelasName = typeof item.siswa.kelas === 'string' 
          ? item.siswa.kelas 
          : item.siswa.kelas?.nama || ''
        return kelasName === newFilters.kelas
      })
    }
    
    if (filterKey !== 'tingkatPelanggaran' && newFilters.tingkatPelanggaran) {
      filteredData = filteredData.filter(item => 
        item.tingkatPelanggaran === newFilters.tingkatPelanggaran
      )
    }
    
    if (filterKey !== 'jenisPelanggaran' && newFilters.jenisPelanggaran) {
      filteredData = filteredData.filter(item => 
        item.jenisPelanggaran === newFilters.jenisPelanggaran
      )
    }
    
    if (filterKey !== 'status' && newFilters.status) {
      filteredData = filteredData.filter(item => 
        item.status === newFilters.status
      )
    }
    
    if (filterKey !== 'siswa' && newFilters.siswa) {
      filteredData = filteredData.filter(item => 
        item.siswa.nama === newFilters.siswa
      )
    }
    
    onFilterChange(filteredData)
    onFiltersChange(newFilters)
  }

  const uniqueJenisPelanggaran = getUniqueValues('jenisPelanggaran')
  const uniqueSiswa = getUniqueValues('siswa')
  const activeFiltersCount = getActiveFiltersCount()
  const activeFiltersDisplay = getActiveFiltersDisplay()

  return (
    <div className="space-y-4">
      {/* Filter Trigger Button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="relative">
            <Filter className="mr-2 h-4 w-4" />
            Filter
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Filter Data Pelanggaran</DialogTitle>
            <DialogDescription>
              Gunakan filter untuk menyaring data pelanggaran sesuai kriteria
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Date Range Filter */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="h-4 w-4" />
                  Filter Tanggal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date">Dari Tanggal</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, start: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-date">Sampai Tanggal</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={filters.dateRange.end}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, end: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Other Filters */}
            <div className="grid grid-cols-2 gap-4">
              {/* Kelas Filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Kelas
                </Label>
                <Select value={filters.kelas} onValueChange={(value) => 
                  setFilters(prev => ({ ...prev, kelas: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Semua Kelas</SelectItem>
                    {kelas.map((k) => (
                      <SelectItem key={k.id} value={k.nama}>
                        {k.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tingkat Pelanggaran Filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Tingkat Pelanggaran
                </Label>
                <Select value={filters.tingkatPelanggaran} onValueChange={(value) => 
                  setFilters(prev => ({ ...prev, tingkatPelanggaran: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tingkat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Semua Tingkat</SelectItem>
                    <SelectItem value="RINGAN">Ringan</SelectItem>
                    <SelectItem value="SEDANG">Sedang</SelectItem>
                    <SelectItem value="BERAT">Berat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Jenis Pelanggaran Filter */}
              <div className="space-y-2">
                <Label>Jenis Pelanggaran</Label>
                <Select value={filters.jenisPelanggaran} onValueChange={(value) => 
                  setFilters(prev => ({ ...prev, jenisPelanggaran: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Semua Jenis</SelectItem>
                    {uniqueJenisPelanggaran.map((jenis) => (
                      <SelectItem key={String(jenis)} value={String(jenis)}>
                        {String(jenis)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={filters.status} onValueChange={(value) => 
                  setFilters(prev => ({ ...prev, status: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Semua Status</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="PROSES">Proses</SelectItem>
                    <SelectItem value="SELESAI">Selesai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Siswa Filter */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Siswa
              </Label>
              <Select value={filters.siswa} onValueChange={(value) => 
                setFilters(prev => ({ ...prev, siswa: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih siswa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Siswa</SelectItem>
                  {uniqueSiswa.map((siswa) => (
                    <SelectItem key={String(siswa)} value={String(siswa)}>
                      {String(siswa)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={resetFilters}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Filter
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Batal
                </Button>
                <Button onClick={() => { applyFilters(); setOpen(false); }}>
                  Terapkan Filter
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Active Filters Display */}
      {activeFiltersDisplay.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Filter aktif:</span>
          {activeFiltersDisplay.map((filter) => (
            <Badge key={filter.key} variant="secondary" className="flex items-center gap-1">
              <span className="text-xs">
                <strong>{filter.label}:</strong> {filter.value}
              </span>
              <button
                onClick={() => removeFilter(filter.key)}
                className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {activeFiltersDisplay.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-6 px-2 text-xs"
            >
              Hapus Semua
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
