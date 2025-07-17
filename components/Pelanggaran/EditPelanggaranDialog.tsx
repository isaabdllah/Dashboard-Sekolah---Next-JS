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
import { Textarea } from "@/components/ui/textarea"
import { Edit } from "lucide-react"

interface EditPelanggaranDialogProps {
  pelanggaran: {
    id: string
    siswaId: string
    tanggal: string
    jenisPelanggaran: string
    tingkatPelanggaran: string
    deskripsi: string
    tindakan: string
    status: string
  }
}

export function EditPelanggaranDialog({ pelanggaran }: EditPelanggaranDialogProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Pelanggaran</DialogTitle>
          <DialogDescription>
            Update informasi pelanggaran dan tindakan yang diambil.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="siswa" className="text-right">
                Siswa
              </Label>
              <Select defaultValue={pelanggaran.siswaId}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih siswa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ahmad Fadli - X-A</SelectItem>
                  <SelectItem value="2">Siti Nurhaliza - X-A</SelectItem>
                  <SelectItem value="3">Budi Santoso - X-B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tanggal" className="text-right">
                Tanggal
              </Label>
              <Input
                id="tanggal"
                type="date"
                defaultValue={pelanggaran.tanggal}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jenisPelanggaran" className="text-right">
                Jenis Pelanggaran
              </Label>
              <Select defaultValue={pelanggaran.jenisPelanggaran}>
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
                Tingkat
              </Label>
              <Select defaultValue={pelanggaran.tingkatPelanggaran}>
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
                Deskripsi
              </Label>
              <Textarea
                id="deskripsi"
                defaultValue={pelanggaran.deskripsi}
                placeholder="Jelaskan detail pelanggaran"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tindakan" className="text-right">
                Tindakan
              </Label>
              <Textarea
                id="tindakan"
                defaultValue={pelanggaran.tindakan}
                placeholder="Tindakan yang diambil"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select defaultValue={pelanggaran.status}>
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
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
