"use client"

import { useState } from "react"
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
import { Siswa, api } from "@/lib/api"
import { DeleteDialog } from "@/components/Layout/DeleteDialog"
import { EditSiswaDialog } from "./EditSiswaDialog"

interface SiswaTableProps {
  data: Siswa[]
  onDataChanged?: () => void // Add callback for data refresh
}

export function SiswaTable({ data, onDataChanged }: SiswaTableProps) {
  const [editSiswa, setEditSiswa] = useState<Siswa | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

  const handleEdit = (siswa: Siswa) => {
    setEditSiswa(siswa)
    setEditOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus siswa ini?')) {
      return
    }

    setDeleteLoading(id)
    try {
      await api.deleteSiswa(id)
      
      // Refresh data
      if (onDataChanged) {
        onDataChanged()
      }
    } catch (error) {
      console.error('Error deleting siswa:', error)
      alert('Gagal menghapus siswa. Silakan coba lagi.')
    } finally {
      setDeleteLoading(null)
    }
  }

  const handleView = (id: string) => {
    // Handle view action
    console.log("View siswa:", id)
  }

  const handleEditSuccess = () => {
    setEditOpen(false)
    setEditSiswa(null)
    
    // Refresh data
    if (onDataChanged) {
      onDataChanged()
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NIS</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Jenis Kelamin</TableHead>
            <TableHead>Tanggal Lahir</TableHead>
            <TableHead>Telepon</TableHead>
            <TableHead className="w-[100px]">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((siswa) => (
            <TableRow key={siswa.id}>
              <TableCell className="font-medium">{siswa.nis}</TableCell>
              <TableCell>{siswa.nama}</TableCell>
              <TableCell>
                {typeof siswa.kelas === 'string' ? siswa.kelas : siswa.kelas?.nama || '-'}
              </TableCell>
              <TableCell>
                <Badge variant={siswa.jenisKelamin === 'L' ? 'default' : 'secondary'}>
                  {siswa.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                </Badge>
              </TableCell>
              <TableCell>{new Date(siswa.tanggalLahir).toLocaleDateString('id-ID')}</TableCell>
              <TableCell>{siswa.telepon}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleView(siswa.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Lihat Detail
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEdit(siswa)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(siswa.id)}
                      className="text-red-600"
                      disabled={deleteLoading === siswa.id}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      {deleteLoading === siswa.id ? 'Menghapus...' : 'Hapus'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditSiswaDialog
        siswa={editSiswa}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSiswaUpdated={handleEditSuccess}
      />
    </>
  )
}
