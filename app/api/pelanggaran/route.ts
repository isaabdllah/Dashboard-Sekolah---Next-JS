import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { pelanggaranSchema } from '@/lib/validations'

// GET /api/pelanggaran - Get all pelanggaran
export async function GET() {
  try {
    const pelanggaran = await prisma.pelanggaran.findMany({
      include: {
        siswa: {
          include: {
            kelas: true
          }
        }
      },
      orderBy: {
        tanggal: 'desc'
      }
    })

    return NextResponse.json(pelanggaran)
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil data pelanggaran' },
      { status: 500 }
    )
  }
}

// POST /api/pelanggaran - Create new pelanggaran
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = pelanggaranSchema.parse(body)

    // Verify siswa exists
    const siswa = await prisma.siswa.findUnique({
      where: { id: validatedData.siswaId },
      include: {
        kelas: true
      }
    })

    if (!siswa) {
      return NextResponse.json(
        { error: 'Siswa tidak ditemukan' },
        { status: 400 }
      )
    }

    const pelanggaran = await prisma.pelanggaran.create({
      data: {
        ...validatedData,
        tanggal: new Date(validatedData.tanggal),
      },
      include: {
        siswa: {
          include: {
            kelas: true
          }
        }
      }
    })

    return NextResponse.json(pelanggaran, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Gagal membuat pelanggaran baru' },
      { status: 500 }
    )
  }
}
