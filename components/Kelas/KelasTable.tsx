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
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Kelas } from "@/lib/api"
import { EditKelasDialog } from "./EditKelasDialog"

interface KelasTableProps {
  data: Kelas[]
}

export function KelasTable({ data }: KelasTableProps) {
  const [editKelas, setEditKelas] = useState<Kelas | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  const handleEdit = (kelas: Kelas) => {
    setEditKelas(kelas)
    setEditOpen(true)
  }

  const handleDelete = (id: string) => {
    // Handle delete action
    console.log("Delete kelas:", id)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Kelas</TableHead>
            <TableHead>Tingkat</TableHead>
            <TableHead>Wali Kelas</TableHead>
            <TableHead>Jumlah Siswa</TableHead>
            <TableHead className="w-[100px]">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((kelas) => (
            <TableRow key={kelas.id}>
              <TableCell className="font-medium">{kelas.nama}</TableCell>
              <TableCell>{kelas.tingkat}</TableCell>
              <TableCell>{kelas.waliKelas}</TableCell>
              <TableCell>{kelas.jumlahSiswa}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(kelas)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(kelas.id)}
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

      <EditKelasDialog
        kelas={editKelas}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  )
}
