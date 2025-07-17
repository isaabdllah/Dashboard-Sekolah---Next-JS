import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { updateKelasSchema } from '@/lib/validations'

// GET /api/kelas/[id] - Get kelas by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const kelas = await prisma.kelas.findUnique({
      where: { id: params.id },
      include: {
        siswa: {
          select: {
            id: true,
            nama: true,
            nis: true,
            jenisKelamin: true,
            email: true,
            telepon: true,
          }
        },
        _count: {
          select: {
            siswa: true
          }
        }
      }
    })

    if (!kelas) {
      return NextResponse.json(
        { error: 'Kelas tidak ditemukan' },
        { status: 404 }
      )
    }

    const kelasWithCount = {
      ...kelas,
      jumlahSiswa: kelas._count.siswa
    }

    return NextResponse.json(kelasWithCount)
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil data kelas' },
      { status: 500 }
    )
  }
}

// PUT /api/kelas/[id] - Update kelas
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validatedData = updateKelasSchema.parse(body)

    // Check if kelas exists
    const existingKelas = await prisma.kelas.findUnique({
      where: { id: params.id }
    })

    if (!existingKelas) {
      return NextResponse.json(
        { error: 'Kelas tidak ditemukan' },
        { status: 404 }
      )
    }

    // Check if name is being updated and is unique
    if (validatedData.nama && validatedData.nama !== existingKelas.nama) {
      const existingName = await prisma.kelas.findUnique({
        where: { nama: validatedData.nama }
      })

      if (existingName) {
        return NextResponse.json(
          { error: 'Nama kelas sudah ada' },
          { status: 400 }
        )
      }
    }

    const kelas = await prisma.kelas.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        siswa: true,
        _count: {
          select: {
            siswa: true
          }
        }
      }
    })

    const kelasWithCount = {
      ...kelas,
      jumlahSiswa: kelas._count.siswa
    }

    return NextResponse.json(kelasWithCount)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Gagal mengupdate kelas' },
      { status: 500 }
    )
  }
}

// DELETE /api/kelas/[id] - Delete kelas
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if kelas exists
    const existingKelas = await prisma.kelas.findUnique({
      where: { id: params.id },
      include: {
        siswa: true
      }
    })

    if (!existingKelas) {
      return NextResponse.json(
        { error: 'Kelas tidak ditemukan' },
        { status: 404 }
      )
    }

    // Check if kelas has students
    if (existingKelas.siswa.length > 0) {
      return NextResponse.json(
        { error: 'Tidak dapat menghapus kelas yang masih memiliki siswa' },
        { status: 400 }
      )
    }

    // Delete kelas
    await prisma.kelas.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'Kelas berhasil dihapus'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal menghapus kelas' },
      { status: 500 }
    )
  }
}
