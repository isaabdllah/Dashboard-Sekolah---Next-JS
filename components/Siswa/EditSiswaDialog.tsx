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
import { Siswa } from "@/lib/api"

interface EditSiswaDialogProps {
  siswa: Siswa | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditSiswaDialog({ siswa, open, onOpenChange }: EditSiswaDialogProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    onOpenChange(false)
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
                defaultValue={siswa.nama}
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
                defaultValue={siswa.nis}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="kelas" className="text-right">
                Kelas
              </Label>
              <Select defaultValue={siswa.kelas}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="X-A">X-A</SelectItem>
                  <SelectItem value="X-B">X-B</SelectItem>
                  <SelectItem value="XI-IPA-1">XI-IPA-1</SelectItem>
                  <SelectItem value="XI-IPA-2">XI-IPA-2</SelectItem>
                  <SelectItem value="XII-IPA-1">XII-IPA-1</SelectItem>
                  <SelectItem value="XII-IPA-2">XII-IPA-2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jenisKelamin" className="text-right">
                Jenis Kelamin
              </Label>
              <Select defaultValue={siswa.jenisKelamin}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
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
                defaultValue={siswa.tanggalLahir}
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
                defaultValue={siswa.alamat}
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
                defaultValue={siswa.telepon}
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
                defaultValue={siswa.email}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit">Simpan Perubahan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
