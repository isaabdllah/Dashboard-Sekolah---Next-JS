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
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { api, Siswa } from "@/lib/api"

interface AddPelanggaranDialogProps {
  onDataChanged?: () => void
}

export function AddPelanggaranDialog({ onDataChanged }: AddPelanggaranDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [siswaList, setSiswaList] = useState<Siswa[]>([])
  const [formData, setFormData] = useState({
    siswaId: '',
    tanggal: '',
    jenisPelanggaran: '',
    tingkatPelanggaran: '',
    deskripsi: '',
    tindakan: '',
    status: 'Pending'
  })

  // Fetch siswa data when dialog opens
  useEffect(() => {
    if (open) {
      fetchSiswaData()
    }
  }, [open])

  const fetchSiswaData = async () => {
    try {
      const response = await api.getSiswa()
      setSiswaList(response)
    } catch (error) {
      console.error('Error fetching siswa:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.siswaId || !formData.tanggal || !formData.jenisPelanggaran || 
        !formData.tingkatPelanggaran || !formData.deskripsi || !formData.tindakan) {
      alert('Mohon lengkapi semua field yang wajib diisi')
      return
    }

    setLoading(true)
    try {
      await api.createPelanggaran({
        siswaId: formData.siswaId,
        tanggal: formData.tanggal,
        jenisPelanggaran: formData.jenisPelanggaran,
        tingkatPelanggaran: formData.tingkatPelanggaran.toUpperCase() as 'RINGAN' | 'SEDANG' | 'BERAT',
        deskripsi: formData.deskripsi,
        tindakan: formData.tindakan,
        status: formData.status.toUpperCase() as 'PENDING' | 'PROSES' | 'SELESAI'
      })
      
      // Reset form and close dialog
      setFormData({
        siswaId: '',
        tanggal: '',
        jenisPelanggaran: '',
        tingkatPelanggaran: '',
        deskripsi: '',
        tindakan: '',
        status: 'Pending'
      })
      setOpen(false)
      
      // Trigger data refresh
      if (onDataChanged) {
        onDataChanged()
      }
    } catch (error) {
      console.error('Error creating pelanggaran:', error)
      alert('Gagal menambahkan pelanggaran')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Pelanggaran
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambah Pelanggaran Baru</DialogTitle>
          <DialogDescription>
            Catat pelanggaran siswa dan tindakan yang diambil.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="siswa" className="text-right">
                Siswa *
              </Label>
              <Select value={formData.siswaId} onValueChange={(value) => setFormData({...formData, siswaId: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih siswa" />
                </SelectTrigger>
                <SelectContent>
                  {siswaList.map((siswa) => (
                    <SelectItem key={siswa.id} value={siswa.id}>
                      {siswa.nama} - {siswa.nis} ({typeof siswa.kelas === 'string' ? siswa.kelas : siswa.kelas?.nama || 'No Class'})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tanggal" className="text-right">
                Tanggal *
              </Label>
              <Input
                id="tanggal"
                type="date"
                value={formData.tanggal}
                onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jenisPelanggaran" className="text-right">
                Jenis Pelanggaran *
              </Label>
              <Select value={formData.jenisPelanggaran} onValueChange={(value) => setFormData({...formData, jenisPelanggaran: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih jenis pelanggaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="terlambat">Terlambat</SelectItem>
                  <SelectItem value="tidak-mengerjakan-tugas">Tidak mengerjakan tugas</SelectItem>
                  <SelectItem value="tidak-berseragam">Tidak berseragam</SelectItem>
                  <SelectItem value="berkelahi">Berkelahi</SelectItem>
                  <SelectItem value="membolos">Membolos</SelectItem>
                  <SelectItem value="lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tingkatPelanggaran" className="text-right">
                Tingkat *
              </Label>
              <Select value={formData.tingkatPelanggaran} onValueChange={(value) => setFormData({...formData, tingkatPelanggaran: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih tingkat pelanggaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ringan">Ringan</SelectItem>
                  <SelectItem value="Sedang">Sedang</SelectItem>
                  <SelectItem value="Berat">Berat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deskripsi" className="text-right">
                Deskripsi *
              </Label>
              <Textarea
                id="deskripsi"
                placeholder="Jelaskan detail pelanggaran"
                value={formData.deskripsi}
                onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tindakan" className="text-right">
                Tindakan *
              </Label>
              <Textarea
                id="tindakan"
                placeholder="Tindakan yang diambil"
                value={formData.tindakan}
                onChange={(e) => setFormData({...formData, tindakan: e.target.value})}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Proses">Proses</SelectItem>
                  <SelectItem value="Selesai">Selesai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
