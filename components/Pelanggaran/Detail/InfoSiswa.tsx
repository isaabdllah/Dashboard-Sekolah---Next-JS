"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pelanggaran } from "@/lib/api"

interface InfoSiswaProps {
  pelanggaran: Pelanggaran
}

export function InfoSiswa({ pelanggaran }: InfoSiswaProps) {
  const { siswa } = pelanggaran

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Siswa</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Nama</p>
            <p className="text-base">{siswa.nama}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">NIS</p>
            <p className="text-base">{siswa.nis}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Kelas</p>
            <p className="text-base">{siswa.kelas}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Jenis Kelamin</p>
            <Badge variant={siswa.jenisKelamin === 'L' ? 'default' : 'secondary'}>
              {siswa.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Telepon</p>
            <p className="text-base">{siswa.telepon}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-base">{siswa.email}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Alamat</p>
          <p className="text-base">{siswa.alamat}</p>
        </div>
      </CardContent>
    </Card>
  )
}
