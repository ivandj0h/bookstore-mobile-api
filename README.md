# Bookstore Mobile API

## 📌 Description
Bookstore Mobile API adalah backend API untuk aplikasi mobile bookstore yang menangani autentikasi, manajemen buku, dan berbagai fitur lainnya.

## 🚀 Getting Started

### 1. Clone Repository
```sh
git clone https://github.com/ivandj0h/bookstore-mobile-api.git
cd bookstore-mobile-api
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Konfigurasi Environment Variables
Buat file `.env` di root project dan isi dengan konfigurasi berikut:

```
# SERVER CONFIGURATION
SERVER_APP_NAME=Bookstore Mobile Book API
SERVER_APP_API=localhost
SERVER_APP_PORT=8000

# DATABASE CONFIGURATION
MONGO_URI=mongodb://localhost:27017/bookstore
```

### 4. Menjalankan Server
Jalankan server dengan perintah:
```sh
npm run dev
```
Jika berhasil, server akan berjalan di:
```
📡 Server running on http://localhost:8000
✅ MongoDB Connected
```

## 📚 Project Structure
```
📂 backend
 ┣ 📂 src
 ┃ ┣ 📂 config
 ┃ ┃ ┗ 📝 db.js       # Konfigurasi koneksi MongoDB
 ┃ ┣ 📂 middleware
 ┃ ┃ ┗ 📝 logger.js   # Middleware logging
 ┃ ┣ 📝 index.js      # Entry point utama
 ┣ 📝 .env            # Konfigurasi environment
 ┣ 📝 package.json    # Dependencies & scripts
 ┣ 📝 README.md       # Dokumentasi
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|-------------|-------------|
| GET | `/` | Welcome message |

## 🔧 Built With
- **Node.js** - Runtime JavaScript
- **Express.js** - Web framework for Node.js
- **MongoDB & Mongoose** - Database dan ODM
- **dotenv** - Environment variable management
- **morgan** - Logging middleware

## 📜 License
Project ini menggunakan lisensi **ISC License**.

---
🔥 Happy coding! 🚀
