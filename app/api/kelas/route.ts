import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { kelasSchema } from '@/lib/validations'

// GET /api/kelas - Get all kelas
export async function GET() {
  try {
    const kelas = await prisma.kelas.findMany({
      include: {
        siswa: {
          select: {
            id: true,
            nama: true,
            nis: true,
            jenisKelamin: true,
          }
        },
        _count: {
          select: {
            siswa: true
          }
        }
      },
      orderBy: {
        nama: 'asc'
      }
    })

    // Add jumlahSiswa field for compatibility
    const kelasWithCount = kelas.map((k: any) => ({
      ...k,
      jumlahSiswa: k._count.siswa
    }))

    return NextResponse.json(kelasWithCount)
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil data kelas' },
      { status: 500 }
    )
  }
}

// POST /api/kelas - Create new kelas
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = kelasSchema.parse(body)

    // Check if kelas name already exists
    const existingKelas = await prisma.kelas.findUnique({
      where: { nama: validatedData.nama }
    })

    if (existingKelas) {
      return NextResponse.json(
        { error: 'Nama kelas sudah ada' },
        { status: 400 }
      )
    }

    const kelas = await prisma.kelas.create({
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

    return NextResponse.json(kelasWithCount, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Gagal membuat kelas baru' },
      { status: 500 }
    )
  }
}
