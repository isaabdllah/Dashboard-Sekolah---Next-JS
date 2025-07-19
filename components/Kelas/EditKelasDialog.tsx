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
import { Kelas, api } from "@/lib/api"

interface EditKelasDialogProps {
  kelas: Kelas | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onKelasUpdated?: () => void
}

export function EditKelasDialog({ kelas, open, onOpenChange, onKelasUpdated }: EditKelasDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nama: '',
    tingkat: '',
    jurusan: '',
    paralel: '',
    waliKelas: ''
  })

  // Populate form when kelas changes
  useEffect(() => {
    if (kelas) {
      setFormData({
        nama: kelas.nama,
        tingkat: kelas.tingkat,
        jurusan: kelas.jurusan || '',
        paralel: kelas.paralel || '',
        waliKelas: kelas.waliKelas
      })
    }
  }, [kelas])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!kelas) return

    setLoading(true)
    try {
      await api.updateKelas(kelas.id, {
        nama: formData.nama,
        tingkat: formData.tingkat,
        jurusan: formData.jurusan,
        paralel: formData.paralel,
        waliKelas: formData.waliKelas
      })

      // Call success callback
      if (onKelasUpdated) {
        onKelasUpdated()
      }
      
      onOpenChange(false)
    } catch (error) {
      console.error('Error updating kelas:', error)
      alert('Gagal mengupdate kelas. Silakan coba lagi.')
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

  if (!kelas) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Kelas</DialogTitle>
          <DialogDescription>
            Ubah informasi kelas.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nama" className="text-right">
                Nama Kelas
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
              <Label htmlFor="tingkat" className="text-right">
                Tingkat
              </Label>
              <div className="col-span-3">
                <Select value={formData.tingkat} onValueChange={(value) => handleInputChange('tingkat', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tingkat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="X">X</SelectItem>
                    <SelectItem value="XI">XI</SelectItem>
                    <SelectItem value="XII">XII</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jurusan" className="text-right">
                Jurusan
              </Label>
              <div className="col-span-3">
                <Select value={formData.jurusan} onValueChange={(value) => handleInputChange('jurusan', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jurusan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GP">GP (Geologi Pertambangan)</SelectItem>
                    <SelectItem value="TAB">TAB (Teknik Alat Berat)</SelectItem>
                    <SelectItem value="TKJ">TKJ (Teknik Komputer dan Jaringan)</SelectItem>
                    <SelectItem value="TEI">TEI (Teknik Elektronika Industri)</SelectItem>
                    <SelectItem value="MPLB">MPLB (Manajemen Perkantoran dan Layanan Bisnis)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paralel" className="text-right">
                Paralel
              </Label>
              <Input
                id="paralel"
                value={formData.paralel}
                onChange={(e) => handleInputChange('paralel', e.target.value)}
                className="col-span-3"
                placeholder="e.g., 1, 2, 3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="waliKelas" className="text-right">
                Wali Kelas
              </Label>
              <Input
                id="waliKelas"
                value={formData.waliKelas}
                onChange={(e) => handleInputChange('waliKelas', e.target.value)}
                className="col-span-3"
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
