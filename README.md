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

# API CONFIGURATION
API_PREFIX=/api/v1

# DATABASE CONFIGURATION
MONGO_URI=

# JWT Secret
JWT_SECRET=
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
 ┃ ┃ ┗ 📝 db.js              # Koneksi MongoDB
 ┃ ┣ 📂 routes
 ┃ ┃ ┣ 📝 index.js           # Penggabungan semua route
 ┃ ┃ ┣ 📝 authRoutes.js      # Endpoint autentikasi
 ┃ ┃ ┗ 📝 userRoutes.js      # Endpoint profil pengguna
 ┃ ┣ 📂 controllers
 ┃ ┃ ┣ 📝 authController.js  # Logika autentikasi
 ┃ ┃ ┗ 📝 userController.js  # Logika profil pengguna
 ┃ ┣ 📂 services
 ┃ ┃ ┣ 📝 authService.js     # Business logic autentikasi
 ┃ ┃ ┗ 📝 userService.js     # Business logic profil pengguna
 ┃ ┣ 📂 repositories
 ┃ ┃ ┗ 📝 userRepository.js  # Akses ke MongoDB untuk user
 ┃ ┣ 📂 models
 ┃ ┃ ┗ 📝 userModel.js       # Schema Mongoose untuk user
 ┃ ┣ 📂 middleware
 ┃ ┃ ┗ 📝 authMiddleware.js  # Middleware autentikasi JWT
 ┃ ┣ 📂 utils
 ┃ ┃ ┗ 📝 responseHandler.js # Handler response
 ┃ ┣ 📂 constants
 ┃ ┃ ┣ 📝 statusCodes.js     # Constants HTTP Status Codes
 ┃ ┃ ┗ 📝 messages.js        # Constants Response Messages
 ┃ ┗ 📝 index.js             # Main App
 ┣ 📝 .env                  # Konfigurasi environment
 ┣ 📝 package.json          # Dependencies & scripts
 ┣ 📝 README.md             # Dokumentasi
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|-------------|-------------|
| GET | `/` | Welcome message |
| POST | `/api/v1/auth/register` | Register user |
| POST | `/api/v1/auth/login` | Login user |
| GET | `/api/v1/users` | Get all users (auth) |
| GET | `/api/v1/users/:id` | Get user by ID (auth) |

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
