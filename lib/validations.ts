import { z } from 'zod'

// User schemas
export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  role: z.enum(['ADMIN', 'GURU']).default('ADMIN'),
})

// Siswa schemas
export const siswaSchema = z.object({
  nis: z.string().min(5, 'NIS minimal 5 karakter'),
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
  jenisKelamin: z.enum(['L', 'P']),
  tanggalLahir: z.string().or(z.date()),
  alamat: z.string().min(5, 'Alamat minimal 5 karakter'),
  telepon: z.string().min(10, 'Telepon minimal 10 karakter'),
  email: z.string().email('Email tidak valid'),
  kelasId: z.string().min(1, 'Kelas harus dipilih'),
})

export const updateSiswaSchema = siswaSchema.partial()

// Kelas schemas
export const kelasSchema = z.object({
  nama: z.string().min(2, 'Nama kelas minimal 2 karakter'),
  tingkat: z.string().min(1, 'Tingkat harus diisi'),
  jurusan: z.string().optional(),
  waliKelas: z.string().min(2, 'Nama wali kelas minimal 2 karakter'),
})

export const updateKelasSchema = kelasSchema.partial()

// Pelanggaran schemas
export const pelanggaranSchema = z.object({
  siswaId: z.string().min(1, 'Siswa harus dipilih'),
  tanggal: z.string().or(z.date()),
  jenisPelanggaran: z.string().min(2, 'Jenis pelanggaran harus diisi'),
  tingkatPelanggaran: z.enum(['RINGAN', 'SEDANG', 'BERAT']),
  deskripsi: z.string().min(5, 'Deskripsi minimal 5 karakter'),
  tindakan: z.string().optional(),
  status: z.enum(['PENDING', 'PROSES', 'SELESAI']).default('PENDING'),
  buktiUrl: z.string().optional(),
})

export const updatePelanggaranSchema = pelanggaranSchema.partial()

// Export types
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type SiswaInput = z.infer<typeof siswaSchema>
export type UpdateSiswaInput = z.infer<typeof updateSiswaSchema>
export type KelasInput = z.infer<typeof kelasSchema>
export type UpdateKelasInput = z.infer<typeof updateKelasSchema>
export type PelanggaranInput = z.infer<typeof pelanggaranSchema>
export type UpdatePelanggaranInput = z.infer<typeof updatePelanggaranSchema>
