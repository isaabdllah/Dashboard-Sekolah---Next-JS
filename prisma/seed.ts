import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@sekolah.com' },
    update: {},
    create: {
      name: 'Administrator',
      email: 'admin@sekolah.com',
      password: await hashPassword('password123'),
      role: 'ADMIN',
    },
  })

  // Create guru user
  const guruUser = await prisma.user.upsert({
    where: { email: 'guru@sekolah.com' },
    update: {},
    create: {
      name: 'Guru BK',
      email: 'guru@sekolah.com',
      password: await hashPassword('password123'),
      role: 'GURU',
    },
  })

  console.log('👤 Users created:', { adminUser, guruUser })

  // Create kelas
  const kelas1 = await prisma.kelas.upsert({
    where: { nama: 'XII IPA 1' },
    update: {},
    create: {
      nama: 'XII IPA 1',
      tingkat: 'XII',
      jurusan: 'IPA',
      waliKelas: 'Pak Agus Setiawan',
    },
  })

  const kelas2 = await prisma.kelas.upsert({
    where: { nama: 'XI IPS 2' },
    update: {},
    create: {
      nama: 'XI IPS 2',
      tingkat: 'XI',
      jurusan: 'IPS',
      waliKelas: 'Bu Sari Indah',
    },
  })

  const kelas3 = await prisma.kelas.upsert({
    where: { nama: 'X MIPA 1' },
    update: {},
    create: {
      nama: 'X MIPA 1',
      tingkat: 'X',
      jurusan: 'MIPA',
      waliKelas: 'Pak Budi Santoso',
    },
  })

  console.log('🏫 Kelas created:', { kelas1, kelas2, kelas3 })

  // Create siswa
  const siswa1 = await prisma.siswa.upsert({
    where: { nis: '2023001' },
    update: {},
    create: {
      nis: '2023001',
      nama: 'Ahmad Rizki Pratama',
      jenisKelamin: 'L',
      tanggalLahir: new Date('2005-03-15'),
      alamat: 'Jl. Merdeka No. 10, Jakarta',
      telepon: '081234567890',
      email: 'ahmad.rizki@student.sekolah.com',
      kelasId: kelas1.id,
    },
  })

  const siswa2 = await prisma.siswa.upsert({
    where: { nis: '2023002' },
    update: {},
    create: {
      nis: '2023002',
      nama: 'Siti Nurhaliza',
      jenisKelamin: 'P',
      tanggalLahir: new Date('2005-07-22'),
      alamat: 'Jl. Sudirman No. 25, Jakarta',
      telepon: '081234567891',
      email: 'siti.nurhaliza@student.sekolah.com',
      kelasId: kelas1.id,
    },
  })

  const siswa3 = await prisma.siswa.upsert({
    where: { nis: '2023003' },
    update: {},
    create: {
      nis: '2023003',
      nama: 'Budi Santoso',
      jenisKelamin: 'L',
      tanggalLahir: new Date('2006-01-10'),
      alamat: 'Jl. Pahlawan No. 5, Jakarta',
      telepon: '081234567892',
      email: 'budi.santoso@student.sekolah.com',
      kelasId: kelas2.id,
    },
  })

  const siswa4 = await prisma.siswa.upsert({
    where: { nis: '2023004' },
    update: {},
    create: {
      nis: '2023004',
      nama: 'Dewi Sartika',
      jenisKelamin: 'P',
      tanggalLahir: new Date('2007-05-18'),
      alamat: 'Jl. Gatot Subroto No. 15, Jakarta',
      telepon: '081234567893',
      email: 'dewi.sartika@student.sekolah.com',
      kelasId: kelas3.id,
    },
  })

  const siswa5 = await prisma.siswa.upsert({
    where: { nis: '2023005' },
    update: {},
    create: {
      nis: '2023005',
      nama: 'Farid Rahman',
      jenisKelamin: 'L',
      tanggalLahir: new Date('2007-11-03'),
      alamat: 'Jl. Thamrin No. 8, Jakarta',
      telepon: '081234567894',
      email: 'farid.rahman@student.sekolah.com',
      kelasId: kelas3.id,
    },
  })

  console.log('👨‍🎓 Siswa created:', { siswa1, siswa2, siswa3, siswa4, siswa5 })

  // Create pelanggaran
  const pelanggaran1 = await prisma.pelanggaran.create({
    data: {
      siswaId: siswa1.id,
      tanggal: new Date('2024-01-15'),
      jenisPelanggaran: 'Terlambat',
      tingkatPelanggaran: 'RINGAN',
      deskripsi: 'Terlambat masuk kelas selama 15 menit tanpa keterangan yang jelas',
      tindakan: 'Teguran lisan dan pencatatan di buku pelanggaran',
      status: 'SELESAI',
    },
  })

  const pelanggaran2 = await prisma.pelanggaran.create({
    data: {
      siswaId: siswa2.id,
      tanggal: new Date('2024-01-16'),
      jenisPelanggaran: 'Tidak mengerjakan tugas',
      tingkatPelanggaran: 'SEDANG',
      deskripsi: 'Tidak mengerjakan PR Matematika selama 3 hari berturut-turut',
      tindakan: 'Panggilan orang tua dan bimbingan khusus',
      status: 'PROSES',
    },
  })

  const pelanggaran3 = await prisma.pelanggaran.create({
    data: {
      siswaId: siswa3.id,
      tanggal: new Date('2024-01-17'),
      jenisPelanggaran: 'Berkelahi',
      tingkatPelanggaran: 'BERAT',
      deskripsi: 'Berkelahi dengan teman sekelas di kantin sekolah',
      tindakan: 'Skorsing 3 hari dan mediasi dengan pihak yang bertikai',
      status: 'PENDING',
    },
  })

  const pelanggaran4 = await prisma.pelanggaran.create({
    data: {
      siswaId: siswa4.id,
      tanggal: new Date('2024-01-20'),
      jenisPelanggaran: 'Tidak berseragam',
      tingkatPelanggaran: 'RINGAN',
      deskripsi: 'Tidak memakai seragam lengkap (tidak memakai dasi)',
      tindakan: 'Teguran dan diminta melengkapi seragam',
      status: 'SELESAI',
    },
  })

  const pelanggaran5 = await prisma.pelanggaran.create({
    data: {
      siswaId: siswa5.id,
      tanggal: new Date('2024-01-22'),
      jenisPelanggaran: 'Membolos',
      tingkatPelanggaran: 'SEDANG',
      deskripsi: 'Membolos pelajaran bahasa inggris tanpa ijin',
      tindakan: 'Panggilan orang tua dan konseling',
      status: 'PROSES',
    },
  })

  console.log('⚠️ Pelanggaran created:', { pelanggaran1, pelanggaran2, pelanggaran3, pelanggaran4, pelanggaran5 })

  console.log('✅ Database seeded successfully!')
  console.log(`
📋 Summary:
- Users: 2 (1 Admin, 1 Guru)
- Kelas: 3 
- Siswa: 5
- Pelanggaran: 5

🔑 Login credentials:
Admin: admin@sekolah.com / password123
Guru: guru@sekolah.com / password123
  `)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
