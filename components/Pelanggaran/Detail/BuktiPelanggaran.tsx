"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pelanggaran } from "@/lib/api"
import { ImageIcon, Download } from "lucide-react"

interface BuktiPelanggaranProps {
  pelanggaran: Pelanggaran
}

export function BuktiPelanggaran({ pelanggaran }: BuktiPelanggaranProps) {
  const handleDownload = () => {
    // Handle download bukti
    console.log("Download bukti pelanggaran")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bukti Pelanggaran</CardTitle>
      </CardHeader>
      <CardContent>
        {pelanggaran.buktiUrl ? (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Bukti pelanggaran tersedia
              </p>
              <p className="text-xs text-gray-400 mt-1">
                              <p>URL: {pelanggaran.buktiUrl}</p>
              </p>
            </div>
            <Button onClick={handleDownload} variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Bukti
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              Tidak ada bukti yang dilampirkan
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
