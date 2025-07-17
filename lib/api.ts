// Real API functions for full-stack implementation

const API_BASE = '/api'

// Types
export interface Siswa {
  id: string
  nama: string
  nis: string
  kelas: Kelas | string
  jenisKelamin: 'L' | 'P'
  tanggalLahir: string | Date
  alamat: string
  telepon: string
  email: string
  kelasId: string
  pelanggaran?: Pelanggaran[]
  createdAt?: string | Date
  updatedAt?: string | Date
}

export interface CreateSiswaRequest {
  nama: string
  nis: string
  jenisKelamin: 'L' | 'P'
  tanggalLahir: Date
  alamat: string
  telepon: string
  email: string
  kelasId: string
}

export interface UpdateSiswaRequest {
  nama?: string
  nis?: string
  jenisKelamin?: 'L' | 'P'
  tanggalLahir?: Date
  alamat?: string
  telepon?: string
  email?: string
  kelasId?: string
}

export interface Kelas {
  id: string
  nama: string
  tingkat: string
  jurusan?: string
  waliKelas: string
  jumlahSiswa?: number
  siswa?: Siswa[]
  createdAt?: string | Date
  updatedAt?: string | Date
}

export interface Pelanggaran {
  id: string
  siswaId: string
  siswa: Siswa
  tanggal: string | Date
  jenisPelanggaran: string
  tingkatPelanggaran: 'RINGAN' | 'SEDANG' | 'BERAT'
  deskripsi: string
  buktiUrl?: string
  tindakan?: string
  status: 'PENDING' | 'PROSES' | 'SELESAI'
  createdAt?: string | Date
  updatedAt?: string | Date
}

export interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'GURU'
  createdAt?: string | Date
  updatedAt?: string | Date
}

export interface DashboardStats {
  overview: {
    totalSiswa: number
    totalKelas: number
    totalPelanggaran: number
    totalUser: number
    pelanggaranBulanIni: number
  }
  genderDistribution: Array<{
    jenisKelamin: 'L' | 'P'
    count: number
  }>
  violationLevelDistribution: Array<{
    tingkat: 'RINGAN' | 'SEDANG' | 'BERAT'
    count: number
  }>
  violationStatusDistribution: Array<{
    status: 'PENDING' | 'PROSES' | 'SELESAI'
    count: number
  }>
  classDistribution: Array<{
    nama: string
    tingkat: string
    jurusan?: string
    jumlahSiswa: number
  }>
  recentViolations: Array<{
    id: string
    tanggal: string | Date
    jenisPelanggaran: string
    tingkatPelanggaran: string
    status: string
    siswa: {
      nama: string
      nis: string
      kelas: string
    }
  }>
}

// Helper function for API calls
async function fetchAPI(endpoint: string, options?: RequestInit) {
  const url = `${API_BASE}${endpoint}`
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Network error' }))
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

// API functions
export const api = {
  // Authentication
  login: async (email: string, password: string) => {
    return fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  register: async (userData: { name: string; email: string; password: string; role?: string }) => {
    return fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },

  // Siswa
  getSiswa: async (): Promise<Siswa[]> => {
    return fetchAPI('/siswa')
  },
  
  getSiswaById: async (id: string): Promise<Siswa> => {
    return fetchAPI(`/siswa/${id}`)
  },
  
  createSiswa: async (siswa: CreateSiswaRequest): Promise<Siswa> => {
    return fetchAPI('/siswa', {
      method: 'POST',
      body: JSON.stringify(siswa),
    })
  },
  
  updateSiswa: async (id: string, siswa: UpdateSiswaRequest): Promise<Siswa> => {
    return fetchAPI(`/siswa/${id}`, {
      method: 'PUT',
      body: JSON.stringify(siswa),
    })
  },
  
  deleteSiswa: async (id: string): Promise<void> => {
    return fetchAPI(`/siswa/${id}`, {
      method: 'DELETE',
    })
  },

  // Kelas
  getKelas: async (): Promise<Kelas[]> => {
    return fetchAPI('/kelas')
  },
  
  getKelasById: async (id: string): Promise<Kelas> => {
    return fetchAPI(`/kelas/${id}`)
  },
  
  createKelas: async (kelas: Omit<Kelas, 'id' | 'createdAt' | 'updatedAt'>): Promise<Kelas> => {
    return fetchAPI('/kelas', {
      method: 'POST',
      body: JSON.stringify(kelas),
    })
  },
  
  updateKelas: async (id: string, kelas: Partial<Kelas>): Promise<Kelas> => {
    return fetchAPI(`/kelas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(kelas),
    })
  },
  
  deleteKelas: async (id: string): Promise<void> => {
    return fetchAPI(`/kelas/${id}`, {
      method: 'DELETE',
    })
  },

  // Pelanggaran
  getPelanggaran: async (): Promise<Pelanggaran[]> => {
    return fetchAPI('/pelanggaran')
  },
  
  getPelanggaranById: async (id: string): Promise<Pelanggaran> => {
    return fetchAPI(`/pelanggaran/${id}`)
  },
  
  createPelanggaran: async (pelanggaran: Omit<Pelanggaran, 'id' | 'siswa' | 'createdAt' | 'updatedAt'>): Promise<Pelanggaran> => {
    return fetchAPI('/pelanggaran', {
      method: 'POST',
      body: JSON.stringify(pelanggaran),
    })
  },
  
  updatePelanggaran: async (id: string, pelanggaran: Partial<Pelanggaran>): Promise<Pelanggaran> => {
    return fetchAPI(`/pelanggaran/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pelanggaran),
    })
  },
  
  deletePelanggaran: async (id: string): Promise<void> => {
    return fetchAPI(`/pelanggaran/${id}`, {
      method: 'DELETE',
    })
  },

  // Dashboard Stats
  getDashboardStats: async (): Promise<any> => {
    return fetchAPI('/dashboard/stats')
  },
}
