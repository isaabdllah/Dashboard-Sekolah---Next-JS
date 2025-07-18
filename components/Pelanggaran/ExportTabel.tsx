"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, FileSpreadsheet, File, Printer } from "lucide-react"
import { Pelanggaran } from "@/lib/api"

interface ExportTabelProps {
  data: Pelanggaran[]
  filteredData: Pelanggaran[]
}

export function ExportTabel({ data, filteredData }: ExportTabelProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    dataSource: 'filtered', // 'all' or 'filtered'
    dateRange: {
      start: '',
      end: ''
    },
    includeFields: {
      siswa: true,
      tanggal: true,
      jenisPelanggaran: true,
      tingkatPelanggaran: true,
      deskripsi: true,
      tindakan: true,
      status: true
    }
  })

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report', icon: FileText, desc: 'Laporan formal dalam format PDF' },
    { value: 'excel', label: 'Excel Spreadsheet', icon: FileSpreadsheet, desc: 'Data dalam format Excel (.xlsx)' },
    { value: 'csv', label: 'CSV Data', icon: File, desc: 'Data mentah dalam format CSV' },
    { value: 'print', label: 'Print Report', icon: Printer, desc: 'Cetak laporan langsung' }
  ]

  const getDataToExport = () => {
    const sourceData = exportConfig.dataSource === 'all' ? data : filteredData
    
    // Filter by date range if specified
    let filteredByDate = sourceData
    if (exportConfig.dateRange.start && exportConfig.dateRange.end) {
      const startDate = new Date(exportConfig.dateRange.start)
      const endDate = new Date(exportConfig.dateRange.end)
      filteredByDate = sourceData.filter(item => {
        const itemDate = new Date(item.tanggal)
        return itemDate >= startDate && itemDate <= endDate
      })
    }

    return filteredByDate
  }

  const generateCSV = (exportData: Pelanggaran[]) => {
    const headers = []
    const { includeFields } = exportConfig

    if (includeFields.siswa) headers.push('Nama Siswa', 'NIS', 'Kelas')
    if (includeFields.tanggal) headers.push('Tanggal')
    if (includeFields.jenisPelanggaran) headers.push('Jenis Pelanggaran')
    if (includeFields.tingkatPelanggaran) headers.push('Tingkat')
    if (includeFields.deskripsi) headers.push('Deskripsi')
    if (includeFields.tindakan) headers.push('Tindakan')
    if (includeFields.status) headers.push('Status')

    const rows = exportData.map(item => {
      const row = []
      
      if (includeFields.siswa) {
        row.push(item.siswa.nama)
        row.push(item.siswa.nis)
        row.push(typeof item.siswa.kelas === 'string' ? item.siswa.kelas : item.siswa.kelas?.nama || '')
      }
      if (includeFields.tanggal) row.push(new Date(item.tanggal).toLocaleDateString('id-ID'))
      if (includeFields.jenisPelanggaran) row.push(item.jenisPelanggaran)
      if (includeFields.tingkatPelanggaran) row.push(item.tingkatPelanggaran)
      if (includeFields.deskripsi) row.push(item.deskripsi)
      if (includeFields.tindakan) row.push(item.tindakan)
      if (includeFields.status) row.push(item.status)

      return row
    })

    return [headers, ...rows].map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n')
  }

  const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const generatePDFContent = (exportData: Pelanggaran[]) => {
    // For PDF, we'll create a simple HTML that can be printed
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Laporan Pelanggaran Siswa</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .info { margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .status-pending { color: #f59e0b; }
          .status-proses { color: #3b82f6; }
          .status-selesai { color: #10b981; }
          .tingkat-ringan { color: #10b981; }
          .tingkat-sedang { color: #f59e0b; }
          .tingkat-berat { color: #ef4444; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>LAPORAN PELANGGARAN SISWA</h1>
          <p>Tanggal Export: ${new Date().toLocaleDateString('id-ID')}</p>
        </div>
        
        <div class="info">
          <p><strong>Total Data:</strong> ${exportData.length} pelanggaran</p>
          <p><strong>Periode:</strong> ${exportConfig.dateRange.start && exportConfig.dateRange.end 
            ? `${new Date(exportConfig.dateRange.start).toLocaleDateString('id-ID')} - ${new Date(exportConfig.dateRange.end).toLocaleDateString('id-ID')}`
            : 'Semua Data'}</p>
        </div>

        <table>
          <thead>
            <tr>
              ${exportConfig.includeFields.siswa ? '<th>Nama Siswa</th><th>NIS</th><th>Kelas</th>' : ''}
              ${exportConfig.includeFields.tanggal ? '<th>Tanggal</th>' : ''}
              ${exportConfig.includeFields.jenisPelanggaran ? '<th>Jenis Pelanggaran</th>' : ''}
              ${exportConfig.includeFields.tingkatPelanggaran ? '<th>Tingkat</th>' : ''}
              ${exportConfig.includeFields.deskripsi ? '<th>Deskripsi</th>' : ''}
              ${exportConfig.includeFields.tindakan ? '<th>Tindakan</th>' : ''}
              ${exportConfig.includeFields.status ? '<th>Status</th>' : ''}
            </tr>
          </thead>
          <tbody>
            ${exportData.map(item => `
              <tr>
                ${exportConfig.includeFields.siswa ? `
                  <td>${item.siswa.nama}</td>
                  <td>${item.siswa.nis}</td>
                  <td>${typeof item.siswa.kelas === 'string' ? item.siswa.kelas : item.siswa.kelas?.nama || ''}</td>
                ` : ''}
                ${exportConfig.includeFields.tanggal ? `<td>${new Date(item.tanggal).toLocaleDateString('id-ID')}</td>` : ''}
                ${exportConfig.includeFields.jenisPelanggaran ? `<td>${item.jenisPelanggaran}</td>` : ''}
                ${exportConfig.includeFields.tingkatPelanggaran ? `<td><span class="tingkat-${item.tingkatPelanggaran.toLowerCase()}">${item.tingkatPelanggaran}</span></td>` : ''}
                ${exportConfig.includeFields.deskripsi ? `<td>${item.deskripsi}</td>` : ''}
                ${exportConfig.includeFields.tindakan ? `<td>${item.tindakan}</td>` : ''}
                ${exportConfig.includeFields.status ? `<td><span class="status-${item.status.toLowerCase()}">${item.status}</span></td>` : ''}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `
    
    return htmlContent
  }

  const handleExport = async () => {
    setLoading(true)
    try {
      const exportData = getDataToExport()
      const timestamp = new Date().toISOString().slice(0, 10)
      const filename = `pelanggaran-${timestamp}`

      switch (exportConfig.format) {
        case 'csv':
          const csvContent = generateCSV(exportData)
          downloadCSV(csvContent, `${filename}.csv`)
          break
          
        case 'excel':
          // For Excel, we'll generate CSV with .xlsx extension
          // In a real app, you might want to use a library like xlsx
          const excelContent = generateCSV(exportData)
          downloadCSV(excelContent, `${filename}.xlsx`)
          break
          
        case 'pdf':
        case 'print':
          const htmlContent = generatePDFContent(exportData)
          const printWindow = window.open('', '_blank')
          if (printWindow) {
            printWindow.document.write(htmlContent)
            printWindow.document.close()
            
            if (exportConfig.format === 'print') {
              printWindow.print()
            } else {
              // For PDF, user can use browser's print to PDF
              setTimeout(() => {
                printWindow.print()
              }, 500)
            }
          }
          break
      }
      
      setOpen(false)
    } catch (error) {
      console.error('Error exporting data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Export Data Pelanggaran</DialogTitle>
          <DialogDescription>
            Pilih format dan konfigurasi export data pelanggaran
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Format Selection */}
          <div className="space-y-2">
            <Label>Pilih Format Export</Label>
            <div className="grid grid-cols-2 gap-4">
              {formatOptions.map((format) => (
                <Card 
                  key={format.value}
                  className={`cursor-pointer transition-colors ${
                    exportConfig.format === format.value ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setExportConfig(prev => ({ ...prev, format: format.value }))}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <format.icon className="h-4 w-4" />
                      {format.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs">{format.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Data Source */}
          <div className="space-y-2">
            <Label>Sumber Data</Label>
            <Select value={exportConfig.dataSource} onValueChange={(value) => 
              setExportConfig(prev => ({ ...prev, dataSource: value }))
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="filtered">
                  Data Terfilter ({filteredData.length} items)
                </SelectItem>
                <SelectItem value="all">
                  Semua Data ({data.length} items)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label>Filter Tanggal (Opsional)</Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="date"
                  value={exportConfig.dateRange.start}
                  onChange={(e) => setExportConfig(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, start: e.target.value }
                  }))}
                />
              </div>
              <div className="flex-1">
                <Input
                  type="date"
                  value={exportConfig.dateRange.end}
                  onChange={(e) => setExportConfig(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, end: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Field Selection */}
          <div className="space-y-2">
            <Label>Pilih Data yang Akan Di-export</Label>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(exportConfig.includeFields).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => setExportConfig(prev => ({
                      ...prev,
                      includeFields: { ...prev.includeFields, [key]: checked }
                    }))}
                  />
                  <Label htmlFor={key} className="text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Export Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Data yang akan di-export:</strong> {getDataToExport().length} pelanggaran
            </p>
            {exportConfig.dateRange.start && exportConfig.dateRange.end && (
              <p className="text-sm text-gray-600">
                <strong>Periode:</strong> {new Date(exportConfig.dateRange.start).toLocaleDateString('id-ID')} - {new Date(exportConfig.dateRange.end).toLocaleDateString('id-ID')}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button onClick={handleExport} disabled={loading}>
            {loading ? 'Exporting...' : 'Export Data'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
