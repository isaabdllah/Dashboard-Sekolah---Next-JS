import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Get basic counts
    const [totalSiswa, totalKelas, totalPelanggaran, totalUser] = await Promise.all([
      prisma.siswa.count(),
      prisma.kelas.count(),
      prisma.pelanggaran.count(),
      prisma.user.count(),
    ])

    // Get current month violations
    const currentDate = new Date()
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    const pelanggaranBulanIni = await prisma.pelanggaran.count({
      where: {
        tanggal: {
          gte: startOfMonth,
          lte: endOfMonth,
        }
      }
    })

    // Get gender distribution
    const genderStats = await prisma.siswa.groupBy({
      by: ['jenisKelamin'],
      _count: {
        jenisKelamin: true
      }
    })

    // Get violation level distribution
    const violationLevelStats = await prisma.pelanggaran.groupBy({
      by: ['tingkatPelanggaran'],
      _count: {
        tingkatPelanggaran: true
      }
    })

    // Get violation status distribution
    const violationStatusStats = await prisma.pelanggaran.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    })

    // Get violation type distribution
    const violationTypeStats = await prisma.pelanggaran.groupBy({
      by: ['jenisPelanggaran'],
      _count: {
        jenisPelanggaran: true
      }
    })

    // Get recent violations (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const recentViolations = await prisma.pelanggaran.findMany({
      where: {
        tanggal: {
          gte: sevenDaysAgo
        }
      },
      include: {
        siswa: {
          select: {
            nama: true,
            nis: true,
            kelas: {
              select: {
                nama: true
              }
            }
          }
        }
      },
      orderBy: {
        tanggal: 'desc'
      },
      take: 10
    })

    // Get class distribution
    const classStats = await prisma.kelas.findMany({
      include: {
        _count: {
          select: {
            siswa: true
          }
        }
      }
    })

    const stats = {
      overview: {
        totalSiswa,
        totalKelas,
        totalPelanggaran,
        totalUser,
        pelanggaranBulanIni,
      },
      genderDistribution: genderStats.map((stat: any) => ({
        gender: stat.jenisKelamin,
        count: stat._count.jenisKelamin
      })),
      violationLevelDistribution: violationLevelStats.map((stat: any) => ({
        tingkat: stat.tingkatPelanggaran,
        count: stat._count.tingkatPelanggaran
      })),
      violationStatusDistribution: violationStatusStats.map((stat: any) => ({
        status: stat.status,
        count: stat._count.status
      })),
      violationTypeDistribution: violationTypeStats.map((stat: any) => ({
        jenisPelanggaran: stat.jenisPelanggaran,
        count: stat._count.jenisPelanggaran
      })),
      classDistribution: classStats.map((kelas: any) => ({
        nama: kelas.nama,
        tingkat: kelas.tingkat,
        jurusan: kelas.jurusan,
        count: kelas._count.siswa
      })),
      recentViolations: recentViolations.map((violation: any) => ({
        id: violation.id,
        tanggal: violation.tanggal,
        jenisPelanggaran: violation.jenisPelanggaran,
        tingkatPelanggaran: violation.tingkatPelanggaran,
        status: violation.status,
        siswa: {
          nama: violation.siswa.nama,
          nis: violation.siswa.nis,
          kelas: violation.siswa.kelas.nama
        }
      }))
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil statistik dashboard' },
      { status: 500 }
    )
  }
}
