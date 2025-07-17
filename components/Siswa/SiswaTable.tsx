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
import { Siswa } from "@/lib/api"
import { EditSiswaDialog } from "./EditSiswaDialog"

interface SiswaTableProps {
  data: Siswa[]
}

export function SiswaTable({ data }: SiswaTableProps) {
  const [editSiswa, setEditSiswa] = useState<Siswa | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  const handleEdit = (siswa: Siswa) => {
    setEditSiswa(siswa)
    setEditOpen(true)
  }

  const handleDelete = (id: string) => {
    // Handle delete action
    console.log("Delete siswa:", id)
  }

  const handleView = (id: string) => {
    // Handle view action
    console.log("View siswa:", id)
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
              <TableCell>{siswa.kelas}</TableCell>
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

      <EditSiswaDialog
        siswa={editSiswa}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  )
}
