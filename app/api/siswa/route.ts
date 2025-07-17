import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { siswaSchema } from '@/lib/validations'

// GET /api/siswa - Get all siswa
export async function GET() {
  try {
    const siswa = await prisma.siswa.findMany({
      include: {
        kelas: true,
        pelanggaran: {
          select: {
            id: true,
            tanggal: true,
            jenisPelanggaran: true,
            tingkatPelanggaran: true,
            status: true,
          }
        }
      },
      orderBy: {
        nama: 'asc'
      }
    })

    return NextResponse.json(siswa)
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil data siswa' },
      { status: 500 }
    )
  }
}

// POST /api/siswa - Create new siswa
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = siswaSchema.parse(body)

    // Check if NIS already exists
    const existingNis = await prisma.siswa.findUnique({
      where: { nis: validatedData.nis }
    })

    if (existingNis) {
      return NextResponse.json(
        { error: 'NIS sudah terdaftar' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingEmail = await prisma.siswa.findUnique({
      where: { email: validatedData.email }
    })

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 400 }
      )
    }

    // Verify kelas exists
    const kelas = await prisma.kelas.findUnique({
      where: { id: validatedData.kelasId }
    })

    if (!kelas) {
      return NextResponse.json(
        { error: 'Kelas tidak ditemukan' },
        { status: 400 }
      )
    }

    const siswa = await prisma.siswa.create({
      data: {
        ...validatedData,
        tanggalLahir: new Date(validatedData.tanggalLahir),
      },
      include: {
        kelas: true
      }
    })

    return NextResponse.json(siswa, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Gagal membuat siswa baru' },
      { status: 500 }
    )
  }
}
