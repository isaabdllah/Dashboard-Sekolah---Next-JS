"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { Pelanggaran } from "@/lib/api"
import { formatDate } from "@/lib/utils"
import { EditPelanggaranDialog } from "./EditPelanggaranDialog"

interface PelanggaranTableProps {
  data: Pelanggaran[]
}

export function PelanggaranTable({ data }: PelanggaranTableProps) {
  const handleEdit = (id: string) => {
    console.log("Edit pelanggaran:", id)
  }

  const handleDelete = (id: string) => {
    console.log("Delete pelanggaran:", id)
  }

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal</TableHead>
          <TableHead>Nama Siswa</TableHead>
          <TableHead>Kelas</TableHead>
          <TableHead>Jenis Pelanggaran</TableHead>
          <TableHead>Tingkat</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[100px]">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((pelanggaran) => (
          <TableRow key={pelanggaran.id}>
            <TableCell>{formatDate(pelanggaran.tanggal)}</TableCell>
            <TableCell className="font-medium">{pelanggaran.siswa.nama}</TableCell>
            <TableCell>{pelanggaran.siswa.kelas}</TableCell>
            <TableCell>{pelanggaran.jenisPelanggaran}</TableCell>
            <TableCell>
              <Badge className={getTingkatColor(pelanggaran.tingkatPelanggaran)}>
                {pelanggaran.tingkatPelanggaran}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(pelanggaran.status)}>
                {pelanggaran.status}
              </Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/pelanggaran/${pelanggaran.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Lihat Detail
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleEdit(pelanggaran.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(pelanggaran.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hapus
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
