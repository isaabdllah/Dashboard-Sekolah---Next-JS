import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { updateSiswaSchema } from '@/lib/validations'

// GET /api/siswa/[id] - Get siswa by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const siswa = await prisma.siswa.findUnique({
      where: { id: params.id },
      include: {
        kelas: true,
        pelanggaran: {
          include: {
            siswa: {
              select: {
                nama: true,
                nis: true
              }
            }
          },
          orderBy: {
            tanggal: 'desc'
          }
        }
      }
    })

    if (!siswa) {
      return NextResponse.json(
        { error: 'Siswa tidak ditemukan' },
        { status: 404 }
      )
    }

    return NextResponse.json(siswa)
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil data siswa' },
      { status: 500 }
    )
  }
}

// PUT /api/siswa/[id] - Update siswa
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validatedData = updateSiswaSchema.parse(body)

    // Check if siswa exists
    const existingSiswa = await prisma.siswa.findUnique({
      where: { id: params.id }
    })

    if (!existingSiswa) {
      return NextResponse.json(
        { error: 'Siswa tidak ditemukan' },
        { status: 404 }
      )
    }

    // Check if NIS is being updated and is unique
    if (validatedData.nis && validatedData.nis !== existingSiswa.nis) {
      const existingNis = await prisma.siswa.findUnique({
        where: { nis: validatedData.nis }
      })

      if (existingNis) {
        return NextResponse.json(
          { error: 'NIS sudah terdaftar' },
          { status: 400 }
        )
      }
    }

    // Check if email is being updated and is unique
    if (validatedData.email && validatedData.email !== existingSiswa.email) {
      const existingEmail = await prisma.siswa.findUnique({
        where: { email: validatedData.email }
      })

      if (existingEmail) {
        return NextResponse.json(
          { error: 'Email sudah terdaftar' },
          { status: 400 }
        )
      }
    }

    // Verify kelas exists if being updated
    if (validatedData.kelasId) {
      const kelas = await prisma.kelas.findUnique({
        where: { id: validatedData.kelasId }
      })

      if (!kelas) {
        return NextResponse.json(
          { error: 'Kelas tidak ditemukan' },
          { status: 400 }
        )
      }
    }

    const updateData = {
      ...validatedData,
      ...(validatedData.tanggalLahir && {
        tanggalLahir: new Date(validatedData.tanggalLahir)
      })
    }

    const siswa = await prisma.siswa.update({
      where: { id: params.id },
      data: updateData,
      include: {
        kelas: true
      }
    })

    return NextResponse.json(siswa)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Gagal mengupdate siswa' },
      { status: 500 }
    )
  }
}

// DELETE /api/siswa/[id] - Delete siswa
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if siswa exists
    const existingSiswa = await prisma.siswa.findUnique({
      where: { id: params.id },
      include: {
        pelanggaran: true
      }
    })

    if (!existingSiswa) {
      return NextResponse.json(
        { error: 'Siswa tidak ditemukan' },
        { status: 404 }
      )
    }

    // Delete all related pelanggaran first
    await prisma.pelanggaran.deleteMany({
      where: { siswaId: params.id }
    })

    // Delete siswa
    await prisma.siswa.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'Siswa berhasil dihapus'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal menghapus siswa' },
      { status: 500 }
    )
  }
}
