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
import { Kelas } from "@/lib/api"

interface EditKelasDialogProps {
  kelas: Kelas | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditKelasDialog({ kelas, open, onOpenChange }: EditKelasDialogProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    onOpenChange(false)
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
                defaultValue={kelas.nama}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tingkat" className="text-right">
                Tingkat
              </Label>
              <Input
                id="tingkat"
                defaultValue={kelas.tingkat}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="waliKelas" className="text-right">
                Wali Kelas
              </Label>
              <Input
                id="waliKelas"
                defaultValue={kelas.waliKelas}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jumlahSiswa" className="text-right">
                Jumlah Siswa
              </Label>
              <Input
                id="jumlahSiswa"
                type="number"
                defaultValue={kelas.jumlahSiswa}
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
