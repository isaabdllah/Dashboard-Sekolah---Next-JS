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
import { Plus } from "lucide-react"
import { api } from "@/lib/api"

interface AddKelasDialogProps {
  onKelasAdded?: () => void
}

export function AddKelasDialog({ onKelasAdded }: AddKelasDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nama: '',
    tingkat: '',
    jurusan: '',
    waliKelas: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.createKelas({
        nama: formData.nama,
        tingkat: formData.tingkat,
        jurusan: formData.jurusan,
        waliKelas: formData.waliKelas
      })
      
      // Reset form
      setFormData({
        nama: '',
        tingkat: '',
        jurusan: '',
        waliKelas: ''
      })
      
      setOpen(false)
      onKelasAdded?.()
    } catch (error) {
      console.error('Error creating kelas:', error)
      alert('Gagal menambahkan kelas')
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Kelas
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Kelas Baru</DialogTitle>
          <DialogDescription>
            Masukkan informasi kelas baru.
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
                placeholder="e.g., XII TKJ 1"
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
              <Label htmlFor="waliKelas" className="text-right">
                Wali Kelas
              </Label>
              <Input
                id="waliKelas"
                value={formData.waliKelas}
                onChange={(e) => handleInputChange('waliKelas', e.target.value)}
                className="col-span-3"
                placeholder="Nama wali kelas"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Tambah Kelas'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
