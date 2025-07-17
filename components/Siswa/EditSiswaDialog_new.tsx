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
import { Siswa, Kelas, api } from "@/lib/api"

interface EditSiswaDialogProps {
  siswa: Siswa | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSiswaUpdated?: () => void
}

export function EditSiswaDialog({ siswa, open, onOpenChange, onSiswaUpdated }: EditSiswaDialogProps) {
  const [loading, setLoading] = useState(false)
  const [kelas, setKelas] = useState<Kelas[]>([])
  const [formData, setFormData] = useState({
    nama: '',
    nis: '',
    jenisKelamin: '',
    tanggalLahir: '',
    alamat: '',
    telepon: '',
    email: '',
    kelasId: ''
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

  // Populate form when siswa changes
  useEffect(() => {
    if (siswa) {
      setFormData({
        nama: siswa.nama,
        nis: siswa.nis,
        jenisKelamin: siswa.jenisKelamin,
        tanggalLahir: siswa.tanggalLahir instanceof Date 
          ? siswa.tanggalLahir.toISOString().split('T')[0]
          : new Date(siswa.tanggalLahir).toISOString().split('T')[0],
        alamat: siswa.alamat,
        telepon: siswa.telepon,
        email: siswa.email,
        kelasId: siswa.kelasId
      })
    }
  }, [siswa])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!siswa) return

    setLoading(true)
    try {
      await api.updateSiswa(siswa.id, {
        nama: formData.nama,
        nis: formData.nis,
        jenisKelamin: formData.jenisKelamin as 'L' | 'P',
        tanggalLahir: new Date(formData.tanggalLahir),
        alamat: formData.alamat,
        telepon: formData.telepon,
        email: formData.email,
        kelasId: formData.kelasId
      })

      // Call success callback
      if (onSiswaUpdated) {
        onSiswaUpdated()
      }
      
      onOpenChange(false)
    } catch (error) {
      console.error('Error updating siswa:', error)
      alert('Gagal mengupdate siswa. Silakan coba lagi.')
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

  if (!siswa) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Siswa</DialogTitle>
          <DialogDescription>
            Ubah informasi siswa.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nama" className="text-right">
                Nama Lengkap
              </Label>
              <Input
                id="nama"
                value={formData.nama}
                onChange={(e) => handleInputChange('nama', e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nis" className="text-right">
                NIS
              </Label>
              <Input
                id="nis"
                value={formData.nis}
                onChange={(e) => handleInputChange('nis', e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jenisKelamin" className="text-right">
                Jenis Kelamin
              </Label>
              <div className="col-span-3">
                <Select value={formData.jenisKelamin} onValueChange={(value) => handleInputChange('jenisKelamin', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Laki-laki</SelectItem>
                    <SelectItem value="P">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tanggalLahir" className="text-right">
                Tanggal Lahir
              </Label>
              <Input
                id="tanggalLahir"
                type="date"
                value={formData.tanggalLahir}
                onChange={(e) => handleInputChange('tanggalLahir', e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="kelas" className="text-right">
                Kelas
              </Label>
              <div className="col-span-3">
                <Select value={formData.kelasId} onValueChange={(value) => handleInputChange('kelasId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {kelas.map((k) => (
                      <SelectItem key={k.id} value={k.id}>
                        {k.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telepon" className="text-right">
                Telepon
              </Label>
              <Input
                id="telepon"
                value={formData.telepon}
                onChange={(e) => handleInputChange('telepon', e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alamat" className="text-right">
                Alamat
              </Label>
              <Textarea
                id="alamat"
                value={formData.alamat}
                onChange={(e) => handleInputChange('alamat', e.target.value)}
                className="col-span-3"
                rows={3}
                required
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
