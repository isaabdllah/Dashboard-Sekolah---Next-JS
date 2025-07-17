"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { AppLayout } from "@/components/Layout/AppLayout"
import { InfoSiswa } from "@/components/Pelanggaran/Detail/InfoSiswa"
import { TindakanDiambil } from "@/components/Pelanggaran/Detail/TindakanDiambil"
import { BuktiPelanggaran } from "@/components/Pelanggaran/Detail/BuktiPelanggaran"
import { Button } from "@/components/ui/button"
import { api, Pelanggaran } from "@/lib/api"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"

export default function PelanggaranDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [pelanggaran, setPelanggaran] = useState<Pelanggaran | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPelanggaran = async () => {
      try {
        if (params.id) {
          const data = await api.getPelanggaranById(params.id as string)
          setPelanggaran(data)
        }
      } catch (error) {
        console.error("Error loading pelanggaran:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPelanggaran()
  }, [params.id])

  const handleBack = () => {
    router.back()
  }

  const handleEdit = () => {
    console.log("Edit pelanggaran")
  }

  const handleDelete = () => {
    console.log("Delete pelanggaran")
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
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus
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
    </AppLayout>
  )
}
