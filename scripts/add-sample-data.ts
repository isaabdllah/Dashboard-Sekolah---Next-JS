import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addSampleData() {
  console.log('🌱 Adding more sample data...')

  // Get existing classes
  const kelas = await prisma.kelas.findMany()
  
  if (kelas.length === 0) {
    console.log('❌ No classes found. Please run the seed script first.')
    return
  }

  // Add more students with different birth years
  const additionalStudents = [
    {
      nis: '2023006',
      nama: 'Dewi Sartika',
      jenisKelamin: 'P' as const,
      tanggalLahir: new Date('2006-04-12'),
      alamat: 'Jl. Gatot Subroto No. 15',
      telepon: '081234567895',
      email: 'dewi.sartika@student.sekolah.com',
      kelasId: kelas[0].id,
    },
    {
      nis: '2023007',
      nama: 'Andi Pratama',
      jenisKelamin: 'L' as const,
      tanggalLahir: new Date('2007-08-30'),
      alamat: 'Jl. Diponegoro No. 8',
      telepon: '081234567896',
      email: 'andi.pratama@student.sekolah.com',
      kelasId: kelas[1].id,
    },
    {
      nis: '2023008',
      nama: 'Rina Melati',
      jenisKelamin: 'P' as const,
      tanggalLahir: new Date('2006-11-25'),
      alamat: 'Jl. Ahmad Yani No. 20',
      telepon: '081234567897',
      email: 'rina.melati@student.sekolah.com',
      kelasId: kelas[2].id,
    },
    {
      nis: '2023009',
      nama: 'Fajar Nugroho',
      jenisKelamin: 'L' as const,
      tanggalLahir: new Date('2008-02-14'),
      alamat: 'Jl. Pahlawan No. 12',
      telepon: '081234567898',
      email: 'fajar.nugroho@student.sekolah.com',
      kelasId: kelas[0].id,
    },
    {
      nis: '2023010',
      nama: 'Maya Kusuma',
      jenisKelamin: 'P' as const,
      tanggalLahir: new Date('2007-12-05'),
      alamat: 'Jl. Kemerdekaan No. 7',
      telepon: '081234567899',
      email: 'maya.kusuma@student.sekolah.com',
      kelasId: kelas[1].id,
    }
  ]

  // Create additional students
  for (const studentData of additionalStudents) {
    try {
      await prisma.siswa.upsert({
        where: { nis: studentData.nis },
        update: {},
        create: studentData,
      })
      console.log(`👤 Created student: ${studentData.nama}`)
    } catch (error) {
      console.log(`⚠️ Student ${studentData.nama} already exists`)
    }
  }

  // Add more violations for better chart data
  const allStudents = await prisma.siswa.findMany()
  
  const additionalViolations = [
    {
      siswaId: allStudents[0]?.id,
      tanggal: new Date('2024-01-05'),
      jenisPelanggaran: 'Terlambat',
      tingkatPelanggaran: 'RINGAN' as const,
      deskripsi: 'Terlambat masuk sekolah',
      tindakan: 'Teguran lisan',
      status: 'SELESAI' as const,
    },
    {
      siswaId: allStudents[1]?.id,
      tanggal: new Date('2024-01-10'),
      jenisPelanggaran: 'Tidak Mengerjakan PR',
      tingkatPelanggaran: 'RINGAN' as const,
      deskripsi: 'Tidak mengerjakan PR matematika',
      tindakan: 'Mengerjakan PR di sekolah',
      status: 'SELESAI' as const,
    },
    {
      siswaId: allStudents[2]?.id,
      tanggal: new Date('2024-01-15'),
      jenisPelanggaran: 'Tidak Memakai Seragam',
      tingkatPelanggaran: 'SEDANG' as const,
      deskripsi: 'Tidak memakai seragam lengkap',
      tindakan: 'Panggilan orang tua',
      status: 'PROSES' as const,
    },
    {
      siswaId: allStudents[3]?.id,
      tanggal: new Date('2024-01-20'),
      jenisPelanggaran: 'Mengganggu Kelas',
      tingkatPelanggaran: 'SEDANG' as const,
      deskripsi: 'Membuat keributan di kelas',
      tindakan: 'Konseling',
      status: 'PROSES' as const,
    },
    {
      siswaId: allStudents[0]?.id, // Same student, multiple violations
      tanggal: new Date('2024-01-25'),
      jenisPelanggaran: 'Terlambat',
      tingkatPelanggaran: 'RINGAN' as const,
      deskripsi: 'Terlambat masuk sekolah (kedua kali)',
      tindakan: 'Teguran tertulis',
      status: 'SELESAI' as const,
    }
  ]

  // Create additional violations
  for (const violationData of additionalViolations) {
    if (violationData.siswaId) {
      try {
        await prisma.pelanggaran.create({
          data: violationData
        })
        console.log(`⚠️ Created violation: ${violationData.jenisPelanggaran}`)
      } catch (error) {
        console.log(`⚠️ Error creating violation: ${error}`)
      }
    }
  }

  console.log('✅ Additional sample data added successfully!')
}

addSampleData()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
