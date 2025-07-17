import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { updatePelanggaranSchema } from '@/lib/validations'

// GET /api/pelanggaran/[id] - Get pelanggaran by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pelanggaran = await prisma.pelanggaran.findUnique({
      where: { id: params.id },
      include: {
        siswa: {
          include: {
            kelas: true
          }
        }
      }
    })

    if (!pelanggaran) {
      return NextResponse.json(
        { error: 'Pelanggaran tidak ditemukan' },
        { status: 404 }
      )
    }

    return NextResponse.json(pelanggaran)
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil data pelanggaran' },
      { status: 500 }
    )
  }
}

// PUT /api/pelanggaran/[id] - Update pelanggaran
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validatedData = updatePelanggaranSchema.parse(body)

    // Check if pelanggaran exists
    const existingPelanggaran = await prisma.pelanggaran.findUnique({
      where: { id: params.id }
    })

    if (!existingPelanggaran) {
      return NextResponse.json(
        { error: 'Pelanggaran tidak ditemukan' },
        { status: 404 }
      )
    }

    // Verify siswa exists if being updated
    if (validatedData.siswaId) {
      const siswa = await prisma.siswa.findUnique({
        where: { id: validatedData.siswaId }
      })

      if (!siswa) {
        return NextResponse.json(
          { error: 'Siswa tidak ditemukan' },
          { status: 400 }
        )
      }
    }

    const updateData = {
      ...validatedData,
      ...(validatedData.tanggal && {
        tanggal: new Date(validatedData.tanggal)
      })
    }

    const pelanggaran = await prisma.pelanggaran.update({
      where: { id: params.id },
      data: updateData,
      include: {
        siswa: {
          include: {
            kelas: true
          }
        }
      }
    })

    return NextResponse.json(pelanggaran)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Gagal mengupdate pelanggaran' },
      { status: 500 }
    )
  }
}

// DELETE /api/pelanggaran/[id] - Delete pelanggaran
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if pelanggaran exists
    const existingPelanggaran = await prisma.pelanggaran.findUnique({
      where: { id: params.id }
    })

    if (!existingPelanggaran) {
      return NextResponse.json(
        { error: 'Pelanggaran tidak ditemukan' },
        { status: 404 }
      )
    }

    // Delete pelanggaran
    await prisma.pelanggaran.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'Pelanggaran berhasil dihapus'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal menghapus pelanggaran' },
      { status: 500 }
    )
  }
}
