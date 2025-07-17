# 🏫 Dashboard Sekolah - Tutorial Instalasi & Penggunaan

Dashboard manajemen sekolah modern dengan sistem CRUD lengkap, built dengan Next.js 14 + TypeScript + Prisma.

## 🚀 Cara Install & Jalankan

### 1. Clone Repository
```bash
git clone https://github.com/isaabdllah/Dashboard-Sekolah---Next-JS.git
cd Dashboard-Sekolah---Next-JS
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Database
```bash
# Generate Prisma client
npx prisma generate

# Setup database (SQLite)
npx prisma db push

# Isi database dengan data sample
npx prisma db seed
```

### 4. Jalankan Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi! 🎉

## 🔐 Login Credentials

Setelah database di-seed, gunakan akun berikut untuk login:

**Admin:**
- Email: `admin@sekolah.com`
- Password: `password123`

**Guru:**
- Email: `guru@sekolah.com`  
- Password: `password123`

## 📱 Fitur yang Tersedia

### 🔑 Authentication
- **Login**: `/auth/login` - Login dengan kredensial di atas
- **Register**: `/auth/register` - Daftar akun baru

### 📊 Dashboard
- **Dashboard Utama**: `/dashboard` - Statistik dan charts real-time
- **Manajemen Siswa**: `/dashboard/siswa` - CRUD siswa lengkap
- **Manajemen Kelas**: `/dashboard/kelas` - CRUD kelas lengkap  
- **Pelanggaran**: `/dashboard/pelanggaran` - Tracking pelanggaran siswa

## ✨ Cara Menggunakan

### 1. Login
1. Buka `/auth/login`
2. Masukkan email dan password admin
3. Klik "Masuk"

### 2. Dashboard
- Lihat statistik real-time
- Charts menampilkan data dari database
- Klik "🔄 Refresh Data" untuk update charts

### 3. Manajemen Siswa
- **Tambah**: Klik "Tambah Siswa" → isi form → simpan
- **Edit**: Klik ⋮ di tabel → "Edit" → ubah data → simpan
- **Hapus**: Klik ⋮ di tabel → "Hapus" → konfirmasi
- **Search**: Gunakan search box untuk cari siswa

### 4. Manajemen Kelas
- **Tambah**: Klik "Tambah Kelas" → isi form → simpan
- **Edit**: Klik ⋮ di tabel → "Edit" → ubah data → simpan
- **Hapus**: Klik ⋮ di tabel → "Hapus" → konfirmasi

### 5. Pelanggaran
- **Tambah**: Klik "Tambah Pelanggaran" → pilih siswa dari dropdown → isi form
- **Edit**: Klik ⋮ di tabel → "Edit" → ubah data → simpan
- **Detail**: Klik nama siswa untuk lihat detail pelanggaran

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + TypeScript
- **Database**: SQLite (development) / PostgreSQL (production)
- **ORM**: Prisma
- **UI**: Tailwind CSS + Shadcn/UI
- **Charts**: Recharts
- **Auth**: JWT + bcryptjs

## 📁 Struktur Project

```
app/
├── api/              # Backend API Routes
│   ├── auth/         # Login/Register endpoints
│   ├── siswa/        # Siswa CRUD API
│   ├── kelas/        # Kelas CRUD API
│   └── pelanggaran/  # Pelanggaran CRUD API
├── auth/             # Login/Register pages
└── dashboard/        # Dashboard pages

components/           # React Components
├── Dashboard/        # Charts & analytics
├── Siswa/           # Student management
├── Kelas/           # Class management
├── Pelanggaran/     # Violation tracking
└── ui/              # UI components

prisma/              # Database
├── schema.prisma    # Database schema
├── migrations/      # Database migrations
└── seed.ts          # Sample data
```

## 🔧 Commands

```bash
# Development
npm run dev          # Jalankan dev server
npm run build        # Build untuk production
npm start           # Jalankan production server

# Database
npx prisma studio    # Buka database viewer
npx prisma db seed   # Isi ulang sample data
npx prisma migrate dev  # Buat migration baru
```

## 🗄️ Database Sample

Setelah seed, database berisi:
- **2 Users** (1 Admin, 1 Guru)
- **3 Kelas** (X, XI, XII)
- **8 Siswa** dengan data lengkap
- **10 Pelanggaran** dengan berbagai jenis dan tingkat

## 🐛 Troubleshooting

### Error: Module not found
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install
```

### Database error
```bash
# Reset database
npx prisma db push --force-reset
npx prisma db seed
```

### Port sudah digunakan
```bash
# Gunakan port lain
npm run dev -- -p 3001
```

## 📝 Cara Kontribusi

1. Fork repository ini
2. Buat branch fitur baru: `git checkout -b feature/nama-fitur`
3. Commit perubahan: `git commit -m "Tambah fitur xyz"`
4. Push ke branch: `git push origin feature/nama-fitur`
5. Buat Pull Request

## 💡 Tips Development

- Database viewer: `npx prisma studio`
- Lihat API responses di browser DevTools
- Gunakan TypeScript untuk type safety
- Test CRUD operations di berbagai browser
- Cek responsive design di mobile

---

**Dashboard Sekolah - Sistem Manajemen Sekolah Modern** 🎓