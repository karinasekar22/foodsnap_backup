# FoodSnapReview

FoodSnapReview adalah aplikasi web untuk review makanan berbasis foto. Aplikasi ini menggabungkan Api External  untuk menganalisis foto (menggunakan Google Vision API) dengan fitur interaksi sosial, seperti komentar dan review. Aplikasi ini ditujukan bagi para pecinta kuliner, traveler, dan pengguna media sosial yang ingin berbagi pengalaman kuliner mereka.

## Fitur Utama

- **Integrasi API dengan platform yang terpercaya**  
  Pengguna dapat mengunggah foto makanan atau restoran. Foto yang diunggah akan dianalisis menggunakan Google Vision API untuk mendeteksi label, objek, dan informasi relevan lainnya.

- **User Authentication:**  
  Fitur login dan register untuk mengamankan data dan aktivitas pengguna.

- **Review dan Rating:**  
  Pengguna dapat memberikan rating dan review terhadap makanan atau restoran berdasarkan foto yang diunggah.

- **Komentar:**  
  Fitur komentar untuk mendiskusikan pengalaman dan memberikan feedback terhadap foto atau review.

- **Integrasi Google Maps (Opsional):**  
  Menampilkan lokasi restoran atau tempat makan terdekat berdasarkan data yang didapatkan.

- **Interaksi Sosial:**  
  Pengguna dapat mengikuti (follow) pengguna lain, serta melihat aktivitas atau review terbaru di feed.

## Tech Stack

**Frontend:**
- **React.js:** Untuk membangun antarmuka pengguna.
- **React Router:** Untuk navigasi antar halaman.
- **Axios:** Untuk melakukan API calls ke backend.

**Backend:**
- **Node.js & Express:** Framework server untuk membangun RESTful API.
- **PostgreSQL:** Database SQL untuk menyimpan data pengguna, foto, review, dan komentar.
- **JWT & Bcrypt:** Untuk autentikasi dan pengamanan password.
- **Multer:** Untuk menangani file upload.
- **Google Vision API:** Untuk analisis gambar.
- **Google Maps API:** Untuk integrasi peta dan penentuan lokasi (opsional).

## Struktur Folder
- Terdiri dari backend  sebagai fungsionalnya 
- Frontend untuk component layout nya 
### Backend
- Folder config untuk configurasi dengan database



# ✅ FoodSnap Sprint 1 Progress

## 🎯 Tujuan Sprint 1
Membangun API dasar untuk user, restoran, makanan, komentar, dan sistem rating berbasis PostgreSQL.

---

## 📌 Fitur dan Status

| Fitur | Status | Catatan |
|-------|--------|---------|
| **1. User Auth & Role (Admin / Customer / UMKM)** | ✅ Selesai | Login, register, dan middleware `verifyToken` sudah aktif |
| **2. CRUD User** | ✅ Selesai | Role terdeteksi, validasi dasar |
| **3. CRUD Restoran** | ✅ Selesai | Termasuk upload banner restoran |
| **4. CRUD Item Makanan** | ✅ Selesai | Termasuk upload foto produk |
| **5. Wishlist (Add/Remove)** | 🔄 Dalam Progres | Struktur tabel sudah siap |
| **6. Komentar (buat komentar pertama)** | ✅ Selesai | Endpoint `/api/comment/create` |
| **7. Comment Detail (balas komentar, rating)** | ✅ Selesai | Endpoint `/api/comment/comment-details` |
| **8. Rata-rata rating komentar (by comment_id)** | ✅ Selesai | Endpoint khusus `/average-rating/:id` |
| **9. Relasi Antar Model** | ✅ Selesai | Sudah menggunakan `belongsTo` dan `hasMany` sesuai kebutuhan |
| **10. Struktur Database PostgreSQL** | ✅ Selesai | Semua tabel inti selesai dibuat |

---

## 🔀 Rute API yang Dipisahkan

- `POST /api/comment/create` → komentar pertama (dengan rating)
- `POST /api/comment/comment-details` → detail komentar (balasan atau rating tambahan)
- `GET /api/comment/comment-details/:comment_id` → list balasan & rating
- `GET /api/comment/comment-details/average-rating/:id` → rata-rata rating per komentar

---

## 📊 Estimasi Persentase Penyelesaian

| Area | Progress |
|------|----------|
| Backend API (CRUD, auth, relasi) | ✅ **90%** |
| Validasi & Error Handling | 🔄 **70%** |
| Frontend (form upload, integrasi API) | ❌ **0%** *(belum mulai di Sprint 1)* |
| Dokumentasi API (Postman/openAPI) | 🔄 **50%** |
| Testing (unit/integration) | ❌ **0%** *(opsional di sprint berikutnya)* |

---

## 🚀 Rencana Sprint Selanjutnya (Sprint 2)

1. 🔄 Selesaikan Wishlist Functionality
2. 💬 Sistem threaded reply (jika dibutuhkan)
3. 📷 Integrasi Google Vision API untuk tagging makanan dari foto
4. 📱 Mulai implementasi Frontend React (Login, Home, Detail)
5. 📊 Dashboard UMKM untuk melihat feedback produk

---

> Terakhir update: 12 April 2025

