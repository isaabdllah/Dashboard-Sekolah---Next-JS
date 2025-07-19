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
import { api, Kelas, CreateSiswaRequest } from "@/lib/api"

interface AddSiswaDialogProps {
  onSiswaAdded?: () => void
}

export function AddSiswaDialog({ onSiswaAdded }: AddSiswaDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [kelas, setKelas] = useState<Kelas[]>([])
  const [formData, setFormData] = useState({
    nis: '',
    nama: '',
    jenisKelamin: '',
    tanggalLahir: '',
    alamat: '',
    telepon: '',
    email: '',
    kelasId: ''
  })

  useEffect(() => {
    const loadKelas = async () => {
      try {
        const data = await api.getKelas()
        setKelas(data)
      } catch (error) {
        console.error('Error loading kelas:', error)
      }
    }
    
    if (open) {
      loadKelas()
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.createSiswa({
        ...formData,
        tanggalLahir: new Date(formData.tanggalLahir),
        jenisKelamin: formData.jenisKelamin as 'L' | 'P'
      })
      
      // Reset form
      setFormData({
        nis: '',
        nama: '',
        jenisKelamin: '',
        tanggalLahir: '',
        alamat: '',
        telepon: '',
        email: '',
        kelasId: ''
      })
      
      setOpen(false)
      onSiswaAdded?.()
    } catch (error) {
      console.error('Error creating siswa:', error)
      alert('Gagal menambahkan siswa')
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
          Tambah Siswa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambah Siswa Baru</DialogTitle>
          <DialogDescription>
            Masukkan informasi siswa baru.
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
                placeholder="Nama lengkap siswa"
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
                placeholder="Nomor Induk Siswa"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="kelas" className="text-right">
                Kelas
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="X-GP-1">X-GP-1</SelectItem>
                  <SelectItem value="X-TAB-1">X-TAB-1</SelectItem>
                  <SelectItem value="XI-TKJ-1">XI-TKJ-1</SelectItem>
                  <SelectItem value="XI-TEI-1">XI-TEI-1</SelectItem>
                  <SelectItem value="XII-GP-1">XII-GP-1</SelectItem>
                  <SelectItem value="XII-MPLB-1">XII-MPLB-1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jenisKelamin" className="text-right">
                Jenis Kelamin
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Laki-laki</SelectItem>
                  <SelectItem value="P">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tanggalLahir" className="text-right">
                Tanggal Lahir
              </Label>
              <Input
                id="tanggalLahir"
                type="date"
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
                placeholder="Alamat lengkap"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="noTelepon" className="text-right">
                No. Telepon
              </Label>
              <Input
                id="noTelepon"
                placeholder="Nomor telepon"
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
                placeholder="Email siswa"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button type="submit">Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
