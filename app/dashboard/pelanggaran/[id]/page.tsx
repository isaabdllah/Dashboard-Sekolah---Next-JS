"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { AppLayout } from "@/components/Layout/AppLayout"
import { InfoSiswa } from "@/components/Pelanggaran/Detail/InfoSiswa"
import { TindakanDiambil } from "@/components/Pelanggaran/Detail/TindakanDiambil"
import { BuktiPelanggaran } from "@/components/Pelanggaran/Detail/BuktiPelanggaran"
import { EditPelanggaranDialog } from "@/components/Pelanggaran/EditPelanggaranDialog"
import { Button } from "@/components/ui/button"
import { api, Pelanggaran } from "@/lib/api"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"

export default function PelanggaranDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [pelanggaran, setPelanggaran] = useState<Pelanggaran | null>(null)
  const [loading, setLoading] = useState(true)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    loadPelanggaran()
  }, [params.id])

  const handleBack = () => {
    router.back()
  }

  const handleEdit = () => {
    setEditOpen(true)
  }

  const handleEditSuccess = () => {
    setEditOpen(false)
    // Reload pelanggaran data
    loadPelanggaran()
  }

  const loadPelanggaran = async () => {
    try {
      if (params.id) {
        setLoading(true)
        const data = await api.getPelanggaranById(params.id as string)
        setPelanggaran(data)
      }
    } catch (error) {
      console.error("Error loading pelanggaran:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!pelanggaran) return
    
    if (!confirm('Apakah Anda yakin ingin menghapus pelanggaran ini?')) {
      return
    }

    setDeleteLoading(true)
    try {
      await api.deletePelanggaran(pelanggaran.id)
      router.push('/dashboard/pelanggaran')
    } catch (error) {
      console.error('Error deleting pelanggaran:', error)
      alert('Gagal menghapus pelanggaran. Silakan coba lagi.')
    } finally {
      setDeleteLoading(false)
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </AppLayout>
    )
  }

  if (!pelanggaran) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Pelanggaran tidak ditemukan</div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Detail Pelanggaran</h2>
              <p className="text-muted-foreground">
                Informasi lengkap pelanggaran dan tindakan yang diambil.
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteLoading}>
              <Trash2 className="mr-2 h-4 w-4" />
              {deleteLoading ? 'Menghapus...' : 'Hapus'}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <InfoSiswa pelanggaran={pelanggaran} />
            <BuktiPelanggaran pelanggaran={pelanggaran} />
          </div>
          <div>
            <TindakanDiambil pelanggaran={pelanggaran} />
          </div>
        </div>
      </div>

      <EditPelanggaranDialog
        pelanggaran={pelanggaran}
        open={editOpen}
        onOpenChange={setEditOpen}
        onPelanggaranUpdated={handleEditSuccess}
      />
    </AppLayout>
  )
}
