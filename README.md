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
