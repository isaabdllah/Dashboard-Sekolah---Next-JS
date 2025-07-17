"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Textarea } from "@/components/ui/textarea"
import { Pelanggaran, Siswa, api } from "@/lib/api"

interface EditPelanggaranDialogProps {
  pelanggaran: Pelanggaran | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onPelanggaranUpdated?: () => void
}

export function EditPelanggaranDialog({ pelanggaran, open, onOpenChange, onPelanggaranUpdated }: EditPelanggaranDialogProps) {
  const [loading, setLoading] = useState(false)
  const [siswa, setSiswa] = useState<Siswa[]>([])
  const [formData, setFormData] = useState({
    siswaId: '',
    tanggal: '',
    jenisPelanggaran: '',
    tingkatPelanggaran: '',
    deskripsi: '',
    tindakan: '',
    status: '',
    buktiUrl: ''
  })

  // Load siswa options
  useEffect(() => {
    const loadSiswa = async () => {
      try {
        const siswaData = await api.getSiswa()
        setSiswa(siswaData)
      } catch (error) {
        console.error('Error loading siswa:', error)
      }
    }
    loadSiswa()
  }, [])

  // Populate form when pelanggaran changes
  useEffect(() => {
    if (pelanggaran) {
      setFormData({
        siswaId: pelanggaran.siswaId,
        tanggal: pelanggaran.tanggal instanceof Date 
          ? pelanggaran.tanggal.toISOString().split('T')[0]
          : new Date(pelanggaran.tanggal).toISOString().split('T')[0],
        jenisPelanggaran: pelanggaran.jenisPelanggaran,
        tingkatPelanggaran: pelanggaran.tingkatPelanggaran,
        deskripsi: pelanggaran.deskripsi,
        tindakan: pelanggaran.tindakan || '',
        status: pelanggaran.status,
        buktiUrl: pelanggaran.buktiUrl || ''
      })
    }
  }, [pelanggaran])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pelanggaran) return

    setLoading(true)
    try {
      await api.updatePelanggaran(pelanggaran.id, {
        siswaId: formData.siswaId,
        tanggal: new Date(formData.tanggal),
        jenisPelanggaran: formData.jenisPelanggaran,
        tingkatPelanggaran: formData.tingkatPelanggaran as 'RINGAN' | 'SEDANG' | 'BERAT',
        deskripsi: formData.deskripsi,
        tindakan: formData.tindakan,
        status: formData.status as 'PENDING' | 'PROSES' | 'SELESAI',
        buktiUrl: formData.buktiUrl
      })

      // Call success callback
      if (onPelanggaranUpdated) {
        onPelanggaranUpdated()
      }
      
      onOpenChange(false)
    } catch (error) {
      console.error('Error updating pelanggaran:', error)
      alert('Gagal mengupdate pelanggaran. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!pelanggaran) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Pelanggaran</DialogTitle>
          <DialogDescription>
            Ubah informasi pelanggaran siswa.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="siswa" className="text-right">
                Siswa
              </Label>
              <div className="col-span-3">
                <Select value={formData.siswaId} onValueChange={(value) => handleInputChange('siswaId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih siswa" />
                  </SelectTrigger>
                  <SelectContent>
                    {siswa.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.nama} - {s.nis}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tanggal" className="text-right">
                Tanggal
              </Label>
              <Input
                id="tanggal"
                type="date"
                value={formData.tanggal}
                onChange={(e) => handleInputChange('tanggal', e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jenisPelanggaran" className="text-right">
                Jenis Pelanggaran
              </Label>
              <Input
                id="jenisPelanggaran"
                value={formData.jenisPelanggaran}
                onChange={(e) => handleInputChange('jenisPelanggaran', e.target.value)}
                className="col-span-3"
                placeholder="e.g., Terlambat, Tidak mengerjakan PR"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tingkatPelanggaran" className="text-right">
                Tingkat
              </Label>
              <div className="col-span-3">
                <Select value={formData.tingkatPelanggaran} onValueChange={(value) => handleInputChange('tingkatPelanggaran', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tingkat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RINGAN">Ringan</SelectItem>
                    <SelectItem value="SEDANG">Sedang</SelectItem>
                    <SelectItem value="BERAT">Berat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <div className="col-span-3">
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="PROSES">Proses</SelectItem>
                    <SelectItem value="SELESAI">Selesai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deskripsi" className="text-right">
                Deskripsi
              </Label>
              <Textarea
                id="deskripsi"
                value={formData.deskripsi}
                onChange={(e) => handleInputChange('deskripsi', e.target.value)}
                className="col-span-3"
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tindakan" className="text-right">
                Tindakan
              </Label>
              <Textarea
                id="tindakan"
                value={formData.tindakan}
                onChange={(e) => handleInputChange('tindakan', e.target.value)}
                className="col-span-3"
                rows={2}
                placeholder="Tindakan yang diambil..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
