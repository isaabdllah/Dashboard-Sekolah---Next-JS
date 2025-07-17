// Mock API functions for frontend-only implementation

export interface Siswa {
  id: string
  nama: string
  nis: string
  kelas: string
  jenisKelamin: 'L' | 'P'
  tanggalLahir: string
  alamat: string
  telepon: string
  email: string
}

export interface Kelas {
  id: string
  nama: string
  tingkat: string
  jurusan: string
  waliKelas: string
  jumlahSiswa: number
}

export interface Pelanggaran {
  id: string
  siswaId: string
  siswa: Siswa
  tanggal: string
  jenisPelanggaran: string
  tingkatPelanggaran: 'Ringan' | 'Sedang' | 'Berat'
  deskripsi: string
  bukti?: string
  tindakan: string
  status: 'Belum Ditindak' | 'Sudah Ditindak'
}

// Mock data
const mockSiswa: Siswa[] = [
  {
    id: '1',
    nama: 'Ahmad Rizki',
    nis: '2023001',
    kelas: 'XII IPA 1',
    jenisKelamin: 'L',
    tanggalLahir: '2005-03-15',
    alamat: 'Jl. Merdeka No. 10',
    telepon: '081234567890',
    email: 'ahmad.rizki@email.com'
  },
  {
    id: '2',
    nama: 'Siti Nurhaliza',
    nis: '2023002',
    kelas: 'XII IPA 1',
    jenisKelamin: 'P',
    tanggalLahir: '2005-07-22',
    alamat: 'Jl. Sudirman No. 25',
    telepon: '081234567891',
    email: 'siti.nurhaliza@email.com'
  },
  {
    id: '3',
    nama: 'Budi Santoso',
    nis: '2023003',
    kelas: 'XI IPS 2',
    jenisKelamin: 'L',
    tanggalLahir: '2006-01-10',
    alamat: 'Jl. Pahlawan No. 5',
    telepon: '081234567892',
    email: 'budi.santoso@email.com'
  }
]

const mockKelas: Kelas[] = [
  {
    id: '1',
    nama: 'XII IPA 1',
    tingkat: 'XII',
    jurusan: 'IPA',
    waliKelas: 'Pak Agus',
    jumlahSiswa: 32
  },
  {
    id: '2',
    nama: 'XI IPS 2',
    tingkat: 'XI',
    jurusan: 'IPS',
    waliKelas: 'Bu Sari',
    jumlahSiswa: 28
  },
  {
    id: '3',
    nama: 'X MIPA 1',
    tingkat: 'X',
    jurusan: 'MIPA',
    waliKelas: 'Pak Budi',
    jumlahSiswa: 30
  }
]

const mockPelanggaran: Pelanggaran[] = [
  {
    id: '1',
    siswaId: '1',
    siswa: mockSiswa[0],
    tanggal: '2024-01-15',
    jenisPelanggaran: 'Terlambat',
    tingkatPelanggaran: 'Ringan',
    deskripsi: 'Terlambat masuk kelas 15 menit',
    tindakan: 'Teguran lisan',
    status: 'Sudah Ditindak'
  },
  {
    id: '2',
    siswaId: '2',
    siswa: mockSiswa[1],
    tanggal: '2024-01-16',
    jenisPelanggaran: 'Tidak mengerjakan PR',
    tingkatPelanggaran: 'Sedang',
    deskripsi: 'Tidak mengerjakan PR Matematika',
    tindakan: 'Mengerjakan PR di sekolah',
    status: 'Sudah Ditindak'
  },
  {
    id: '3',
    siswaId: '3',
    siswa: mockSiswa[2],
    tanggal: '2024-01-17',
    jenisPelanggaran: 'Berkelahi',
    tingkatPelanggaran: 'Berat',
    deskripsi: 'Berkelahi dengan teman sekelas',
    tindakan: 'Panggil orang tua',
    status: 'Belum Ditindak'
  }
]

// API functions
export const api = {
  // Siswa
  getSiswa: async (): Promise<Siswa[]> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockSiswa
  },
  
  getSiswaById: async (id: string): Promise<Siswa | null> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockSiswa.find(s => s.id === id) || null
  },
  
  createSiswa: async (siswa: Omit<Siswa, 'id'>): Promise<Siswa> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const newSiswa = { ...siswa, id: Date.now().toString() }
    mockSiswa.push(newSiswa)
    return newSiswa
  },
  
  updateSiswa: async (id: string, siswa: Partial<Siswa>): Promise<Siswa> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockSiswa.findIndex(s => s.id === id)
    if (index !== -1) {
      mockSiswa[index] = { ...mockSiswa[index], ...siswa }
      return mockSiswa[index]
    }
    throw new Error('Siswa not found')
  },
  
  deleteSiswa: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockSiswa.findIndex(s => s.id === id)
    if (index !== -1) {
      mockSiswa.splice(index, 1)
    }
  },

  // Kelas
  getKelas: async (): Promise<Kelas[]> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockKelas
  },
  
  createKelas: async (kelas: Omit<Kelas, 'id'>): Promise<Kelas> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const newKelas = { ...kelas, id: Date.now().toString() }
    mockKelas.push(newKelas)
    return newKelas
  },
  
  updateKelas: async (id: string, kelas: Partial<Kelas>): Promise<Kelas> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockKelas.findIndex(k => k.id === id)
    if (index !== -1) {
      mockKelas[index] = { ...mockKelas[index], ...kelas }
      return mockKelas[index]
    }
    throw new Error('Kelas not found')
  },
  
  deleteKelas: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockKelas.findIndex(k => k.id === id)
    if (index !== -1) {
      mockKelas.splice(index, 1)
    }
  },

  // Pelanggaran
  getPelanggaran: async (): Promise<Pelanggaran[]> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockPelanggaran
  },
  
  getPelanggaranById: async (id: string): Promise<Pelanggaran | null> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockPelanggaran.find(p => p.id === id) || null
  },
  
  createPelanggaran: async (pelanggaran: Omit<Pelanggaran, 'id' | 'siswa'>): Promise<Pelanggaran> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const siswa = mockSiswa.find(s => s.id === pelanggaran.siswaId)
    if (!siswa) throw new Error('Siswa not found')
    
    const newPelanggaran = { 
      ...pelanggaran, 
      id: Date.now().toString(),
      siswa 
    }
    mockPelanggaran.push(newPelanggaran)
    return newPelanggaran
  },
  
  updatePelanggaran: async (id: string, pelanggaran: Partial<Pelanggaran>): Promise<Pelanggaran> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockPelanggaran.findIndex(p => p.id === id)
    if (index !== -1) {
      mockPelanggaran[index] = { ...mockPelanggaran[index], ...pelanggaran }
      return mockPelanggaran[index]
    }
    throw new Error('Pelanggaran not found')
  },
  
  deletePelanggaran: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockPelanggaran.findIndex(p => p.id === id)
    if (index !== -1) {
      mockPelanggaran.splice(index, 1)
    }
  },

  // Dashboard Stats
  getDashboardStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      totalSiswa: mockSiswa.length,
      totalKelas: mockKelas.length,
      totalPelanggaran: mockPelanggaran.length,
      pelanggaranBulanIni: mockPelanggaran.filter(p => {
        const date = new Date(p.tanggal)
        const now = new Date()
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
      }).length
    }
  }
}
