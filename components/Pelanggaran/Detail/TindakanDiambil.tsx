"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pelanggaran } from "@/lib/api"
import { formatDate } from "@/lib/utils"

interface TindakanDiambilProps {
  pelanggaran: Pelanggaran
}

export function TindakanDiambil({ pelanggaran }: TindakanDiambilProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai':
        return 'bg-green-100 text-green-800'
      case 'Proses':
        return 'bg-yellow-100 text-yellow-800'
      case 'Pending':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTingkatColor = (tingkat: string) => {
    switch (tingkat) {
      case 'Ringan':
        return 'bg-green-100 text-green-800'
      case 'Sedang':
        return 'bg-yellow-100 text-yellow-800'
      case 'Berat':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detail Pelanggaran & Tindakan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Tanggal Kejadian</p>
            <p className="text-base">{formatDate(pelanggaran.tanggal)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Jenis Pelanggaran</p>
            <p className="text-base">{pelanggaran.jenisPelanggaran}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tingkat Pelanggaran</p>
            <Badge className={getTingkatColor(pelanggaran.tingkatPelanggaran)}>
              {pelanggaran.tingkatPelanggaran}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <Badge className={getStatusColor(pelanggaran.status)}>
              {pelanggaran.status}
            </Badge>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-500">Deskripsi Pelanggaran</p>
          <p className="text-base mt-1">{pelanggaran.deskripsi}</p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-500">Tindakan yang Diambil</p>
          <p className="text-base mt-1">{pelanggaran.tindakan}</p>
        </div>
      </CardContent>
    </Card>
  )
}
