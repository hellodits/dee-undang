# 🎯 Panduan Lengkap untuk Pemula (Bahasa Indonesia)

Panduan ini akan membantu Anda menjalankan aplikasi Digital Invitation dari NOL, bahkan jika Anda belum pernah coding sebelumnya.

## 📋 Yang Anda Butuhkan

### 1. Software yang Harus Diinstall

#### A. Node.js (Wajib)
**Apa itu?** Software untuk menjalankan aplikasi JavaScript

**Cara Install:**
1. Buka https://nodejs.org
2. Download versi **LTS** (yang direkomendasikan)
3. Jalankan installer yang sudah didownload
4. Klik "Next" terus sampai selesai
5. **Cek instalasi:** Buka Command Prompt (CMD) atau Terminal, ketik:
   ```bash
   node --version
   ```
   Jika muncul angka versi (contoh: v18.17.0), berarti berhasil!

#### B. PostgreSQL (Database - Wajib)
**Apa itu?** Tempat menyimpan data aplikasi (user, undangan, RSVP, dll)

**Pilihan 1: Install di Komputer (Untuk Belajar)**
1. Download dari https://www.postgresql.org/download/
2. Pilih sistem operasi Anda (Windows/Mac/Linux)
3. Install dengan setting default
4. **PENTING:** Catat password yang Anda buat saat install!
5. **Cek instalasi:** Buka CMD/Terminal, ketik:
   ```bash
   psql --version
   ```

**Pilihan 2: Pakai Database Online (Lebih Mudah - DIREKOMENDASIKAN)**

**Supabase (Gratis):**
1. Buka https://supabase.com
2. Klik "Start your project"
3. Daftar dengan email atau GitHub
4. Klik "New Project"
5. Isi:
   - Name: `invitation-app` (atau nama lain)
   - Database Password: buat password (CATAT!)
   - Region: pilih yang terdekat (Singapore untuk Indonesia)
6. Tunggu 2-3 menit sampai database siap
7. Klik "Connect" > "URI" > Copy connection string
8. **SIMPAN** connection string ini, nanti akan dipakai!

#### C. Git (Opsional tapi Direkomendasikan)
**Apa itu?** Software untuk version control

1. Download dari https://git-scm.com
2. Install dengan setting default
3. Cek: `git --version`

#### D. Code Editor (Opsional)
**Apa itu?** Aplikasi untuk edit code

**VS Code (Direkomendasikan):**
1. Download dari https://code.visualstudio.com
2. Install
3. Buka VS Code
4. File > Open Folder > Pilih folder project ini

---

## 🚀 Langkah-Langkah Menjalankan Aplikasi

### LANGKAH 1: Buka Terminal/Command Prompt

**Windows:**
- Tekan `Windows + R`
- Ketik `cmd` lalu Enter
- Atau: Klik kanan di folder project > "Open in Terminal"

**Mac:**
- Tekan `Command + Space`
- Ketik `terminal` lalu Enter

**Di VS Code:**
- Menu: Terminal > New Terminal

### LANGKAH 2: Masuk ke Folder Project

```bash
# Ganti path ini dengan lokasi folder project Anda
cd C:\Projects\digital-invitation

# Atau di Mac/Linux:
cd /Users/namaanda/Projects/digital-invitation
```

**Cek apakah sudah benar:**
```bash
# Windows
dir

# Mac/Linux
ls
```
Anda harus melihat file `package.json`, `README.md`, dll.

### LANGKAH 3: Install Dependencies (Library yang Dibutuhkan)

```bash
npm install
```

**Apa yang terjadi?**
- npm akan download semua library yang dibutuhkan
- Proses ini bisa 2-5 menit tergantung internet
- Akan muncul folder `node_modules` (jangan dihapus!)

**Jika ada error:**
- Pastikan Node.js sudah terinstall
- Coba jalankan lagi: `npm install`
- Atau coba: `npm install --legacy-peer-deps`

### LANGKAH 4: Setup File Environment (.env)

**Apa itu .env?** File yang berisi konfigurasi rahasia (password database, API keys, dll)

#### A. Copy File Template

**Windows (CMD):**
```bash
copy .env.example .env
```

**Mac/Linux atau Git Bash:**
```bash
cp .env.example .env
```

#### B. Edit File .env

**Cara 1: Pakai Notepad**
1. Buka folder project
2. Klik kanan file `.env`
3. Open with > Notepad

**Cara 2: Pakai VS Code**
1. Buka VS Code
2. File > Open File > pilih `.env`

#### C. Isi Konfigurasi

Edit file `.env` seperti ini:

```env
# ===== DATABASE (WAJIB) =====
# Ganti dengan connection string dari Supabase
DATABASE_URL="postgresql://postgres:PASSWORD@db.xxx.supabase.co:5432/postgres"

# ===== NEXTAUTH (WAJIB) =====
NEXTAUTH_URL="http://localhost:3000"

# Generate secret dengan cara:
# Windows: buka https://generate-secret.vercel.app/32
# Mac/Linux: jalankan di terminal: openssl rand -base64 32
NEXTAUTH_SECRET="paste-hasil-generate-disini"

# ===== STRIPE (UNTUK TESTING - OPSIONAL) =====
# Daftar di https://stripe.com lalu ambil test keys
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# ===== GOOGLE OAUTH (OPSIONAL) =====
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# ===== CLOUDINARY (OPSIONAL) =====
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# ===== APP CONFIG (WAJIB) =====
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**PENTING - Yang WAJIB diisi:**
1. `DATABASE_URL` - Connection string dari Supabase
2. `NEXTAUTH_SECRET` - Generate di https://generate-secret.vercel.app/32
3. `NEXTAUTH_URL` - Biarkan `http://localhost:3000`
4. `NEXT_PUBLIC_APP_URL` - Biarkan `http://localhost:3000`

**Yang bisa diisi nanti:**
- Stripe keys (untuk payment)
- Google OAuth (untuk login dengan Google)
- Cloudinary (untuk upload gambar)

**SAVE file .env setelah diedit!**

### LANGKAH 5: Setup Database

#### A. Generate Prisma Client

```bash
npx prisma generate
```

**Apa yang terjadi?**
- Membuat code untuk akses database
- Harus dijalankan setiap kali schema database berubah

#### B. Jalankan Migration (Buat Tabel Database)

```bash
npx prisma migrate dev
```

**Apa yang terjadi?**
- Membuat semua tabel di database (User, Invitation, RSVP, dll)
- Jika ditanya nama migration, ketik: `init` lalu Enter

**Jika ada error "Can't reach database":**
- Cek `DATABASE_URL` di file `.env` sudah benar
- Pastikan database Supabase sudah aktif
- Coba copy ulang connection string dari Supabase

#### C. Seed Database (Isi Data Awal)

```bash
npx prisma db seed
```

**Apa yang terjadi?**
- Membuat 5 template undangan
- Membuat 2 user demo:
  - User biasa: `demo@example.com` / `password123`
  - Admin: `admin@example.com` / `password123`
- Membuat 1 undangan contoh

**Jika ada error:**
- Pastikan migration sudah berhasil
- Coba jalankan ulang: `npx prisma db seed`

### LANGKAH 6: Jalankan Aplikasi! 🎉

```bash
npm run dev
```

**Apa yang terjadi?**
- Server development akan jalan
- Tunggu sampai muncul pesan: "Ready in X seconds"
- Jangan tutup terminal/CMD ini!

**Buka Browser:**
1. Buka Chrome/Firefox/Edge
2. Ketik di address bar: `http://localhost:3000`
3. Tekan Enter

**SELAMAT! Aplikasi sudah jalan! 🎊**

---

## 🎮 Cara Menggunakan Aplikasi

### 1. Login Pertama Kali

**Gunakan akun demo:**
- Email: `demo@example.com`
- Password: `password123`

**Atau buat akun baru:**
1. Klik "Sign Up" di halaman utama
2. Isi nama, email, password
3. Klik "Sign Up"

### 2. Buat Undangan Pertama

1. Setelah login, Anda akan masuk ke Dashboard
2. Klik tombol **"Create New"**
3. Isi:
   - **Invitation Title:** Contoh: "Pernikahan Budi & Ani"
   - **Choose Template:** Pilih salah satu template
4. Klik **"Create Invitation"**

### 3. Edit Undangan

1. Di dashboard, klik tombol **"Edit"** pada undangan
2. Anda akan masuk ke halaman Editor
3. Isi semua field:
   - **Event Title:** Judul acara
   - **Groom/Host Name:** Nama mempelai pria
   - **Bride/Partner Name:** Nama mempelai wanita
   - **Date:** Tanggal acara
   - **Time:** Jam acara
   - **Venue Name:** Nama tempat
   - **Venue Address:** Alamat lengkap
   - **Our Story:** Cerita Anda (opsional)
   - **Primary Color:** Pilih warna tema
4. Lihat preview di sebelah kanan
5. Klik **"Save Draft"** untuk menyimpan
6. Klik **"Publish"** untuk mempublikasikan

### 4. Lihat Undangan Publik

1. Setelah publish, klik tombol **"View Live"**
2. Ini adalah halaman yang akan dilihat tamu
3. Copy URL-nya untuk dibagikan ke tamu

### 5. Test RSVP (Konfirmasi Kehadiran)

1. Di halaman undangan publik, scroll ke bawah
2. Klik tombol **"Respond Now"**
3. Isi form RSVP:
   - Nama
   - Email (opsional)
   - Jumlah tamu
   - Kehadiran (Ya/Tidak/Mungkin)
   - Pesan (opsional)
4. Klik **"Submit RSVP"**

### 6. Lihat Daftar RSVP

1. Kembali ke Dashboard
2. Klik undangan Anda
3. Klik tombol **"View RSVPs"** atau langsung ke `/dashboard/rsvps/[id]`
4. Anda akan melihat:
   - Statistik (Total, Hadir, Tidak Hadir, dll)
   - Daftar semua RSVP
   - Filter berdasarkan status
5. Klik **"Export CSV"** untuk download data

### 7. Akses Admin Dashboard

**Login sebagai admin:**
- Email: `admin@example.com`
- Password: `password123`

**Buka admin panel:**
- Ketik di browser: `http://localhost:3000/admin`
- Anda akan melihat:
  - Total users
  - Total undangan
  - Total RSVP
  - Daftar semua user

---

## 🛠️ Troubleshooting (Mengatasi Masalah)

### Error: "Cannot find module"

**Solusi:**
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules
npm install

# Atau di Windows:
rmdir /s node_modules
npm install
```

### Error: "Port 3000 already in use"

**Solusi:**
```bash
# Gunakan port lain
npm run dev -- -p 3001

# Lalu buka: http://localhost:3001
```

### Error: "Prisma Client not found"

**Solusi:**
```bash
npx prisma generate
```

### Error: "Can't reach database server"

**Solusi:**
1. Cek `DATABASE_URL` di `.env` sudah benar
2. Pastikan database Supabase aktif
3. Test koneksi:
   ```bash
   npx prisma db pull
   ```

### Error: "Invalid credentials" saat login

**Solusi:**
1. Pastikan sudah jalankan seed: `npx prisma db seed`
2. Atau buat akun baru lewat Sign Up
3. Cek email dan password yang digunakan

### Aplikasi tidak muncul di browser

**Solusi:**
1. Pastikan `npm run dev` masih jalan di terminal
2. Tunggu sampai muncul "Ready"
3. Refresh browser (F5)
4. Coba buka di browser lain
5. Cek apakah ada error di terminal

### Error saat build

**Solusi:**
```bash
# Cek error TypeScript
npm run build

# Jika ada error, baca pesan errornya
# Biasanya ada petunjuk file dan baris yang error
```

---

## 📱 Tips & Trik

### 1. Lihat Database Secara Visual

```bash
npx prisma studio
```
- Akan membuka browser dengan GUI database
- Bisa lihat dan edit data langsung
- Sangat berguna untuk debugging

### 2. Reset Database (Hapus Semua Data)

```bash
npx prisma migrate reset
```
**HATI-HATI:** Ini akan menghapus SEMUA data!

### 3. Tambah Template Baru

1. Edit file `lib/templates.ts`
2. Tambah template baru di array `DEFAULT_TEMPLATES`
3. Jalankan: `npx prisma db seed`

### 4. Ubah Warna Tema

Edit file `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    600: '#d946ef', // Ganti warna ini
  },
}
```

### 5. Stop Server

Di terminal yang menjalankan `npm run dev`:
- Windows: Tekan `Ctrl + C`
- Mac: Tekan `Command + C`

### 6. Restart Server

```bash
# Stop dulu (Ctrl+C)
# Lalu jalankan lagi:
npm run dev
```

---

## 🎓 Belajar Lebih Lanjut

### Dokumentasi Lengkap
- `README.md` - Dokumentasi utama
- `GETTING_STARTED.md` - Quick start (English)
- `SETUP.md` - Setup detail
- `PROJECT_STRUCTURE.md` - Struktur project
- `QUICK_REFERENCE.md` - Command reference

### Tutorial Online
- Next.js: https://nextjs.org/learn
- React: https://react.dev/learn
- TypeScript: https://www.typescriptlang.org/docs
- Tailwind CSS: https://tailwindcss.com/docs

### Video Tutorial (YouTube)
- Cari: "Next.js tutorial Indonesia"
- Cari: "React tutorial pemula"
- Cari: "Prisma database tutorial"

---

## 🚀 Deploy ke Internet (Opsional)

Jika ingin aplikasi bisa diakses dari internet:

### 1. Daftar Vercel (Gratis)
1. Buka https://vercel.com
2. Sign up dengan GitHub
3. Klik "Import Project"
4. Connect ke repository GitHub Anda
5. Deploy!

### 2. Setup Environment Variables
Di Vercel dashboard:
1. Settings > Environment Variables
2. Copy semua dari file `.env` Anda
3. Paste satu per satu

### 3. Setup Database Production
Gunakan Supabase (sudah gratis):
1. Buat project baru di Supabase
2. Copy connection string
3. Paste ke Vercel environment variables

**Lihat `DEPLOYMENT.md` untuk panduan lengkap!**

---

## ❓ FAQ (Pertanyaan Sering Ditanya)

### Q: Apakah gratis?
A: Ya! Semua tools yang digunakan punya versi gratis:
- Node.js: Gratis
- PostgreSQL: Gratis
- Supabase: Gratis (dengan limit)
- Vercel: Gratis (dengan limit)

### Q: Apakah harus bayar Stripe?
A: Tidak untuk testing. Stripe punya test mode gratis. Bayar hanya jika sudah production dan ada transaksi real.

### Q: Bisa ganti bahasa ke Indonesia?
A: Bisa! Edit semua text di file-file di folder `app/`. Ganti dari English ke Indonesia.

### Q: Bisa tambah fitur?
A: Bisa! Ini adalah full source code. Anda bebas modifikasi sesuai kebutuhan.

### Q: Butuh berapa lama belajar?
A: Tergantung background:
- Sudah bisa coding: 1-2 hari
- Pemula total: 1-2 minggu
- Untuk pakai saja (tanpa modifikasi): 1 jam

### Q: Apa yang harus dipelajari dulu?
A: Urutan belajar:
1. HTML & CSS (basic)
2. JavaScript (basic)
3. React (basic)
4. Next.js
5. TypeScript (sambil jalan)

---

## 📞 Butuh Bantuan?

### Jika Stuck:
1. Baca error message dengan teliti
2. Google error message tersebut
3. Cek dokumentasi di folder project
4. Tanya di forum:
   - Stack Overflow
   - Reddit r/nextjs
   - Discord Next.js

### Jika Masih Bingung:
- Baca ulang panduan ini pelan-pelan
- Coba ikuti step by step
- Jangan skip langkah
- Catat setiap error yang muncul

---

## ✅ Checklist Pemula

Centang setiap langkah yang sudah selesai:

- [ ] Node.js terinstall
- [ ] Database setup (Supabase)
- [ ] File `.env` sudah diisi
- [ ] `npm install` berhasil
- [ ] `npx prisma migrate dev` berhasil
- [ ] `npx prisma db seed` berhasil
- [ ] `npm run dev` jalan tanpa error
- [ ] Bisa buka `http://localhost:3000`
- [ ] Bisa login dengan akun demo
- [ ] Bisa buat undangan baru
- [ ] Bisa edit undangan
- [ ] Bisa publish undangan
- [ ] Bisa lihat halaman publik
- [ ] Bisa submit RSVP
- [ ] Bisa lihat daftar RSVP

**Jika semua tercentang, SELAMAT! Anda berhasil! 🎉**

---

## 🎯 Langkah Selanjutnya

Setelah aplikasi jalan:

1. **Eksplorasi Fitur**
   - Coba semua menu
   - Test semua template
   - Lihat admin dashboard

2. **Kustomisasi**
   - Ganti warna tema
   - Edit text di halaman
   - Tambah template sendiri

3. **Belajar Code**
   - Buka file-file di VS Code
   - Baca comment di code
   - Coba modifikasi sedikit-sedikit

4. **Deploy**
   - Upload ke GitHub
   - Deploy ke Vercel
   - Share ke teman!

---

**Selamat belajar dan semoga sukses! 🚀**

Jika ada pertanyaan, jangan ragu untuk bertanya!
