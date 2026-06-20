# SpoTify 3.0 Backend API Documentation

Welcome to the backend API reference. This backend is built using Express, MongoDB, Mongoose, and Cloudinary for file storage.

## Base URL
All API routes are prefixed with `/api`. For example, `http://localhost:3000/api`

---

## Authentication Routes

### `POST /api/auth/register`
Creates a new user and auto-logs them in.
- **Auth Required:** No
- **Request Body:**
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword",
    "role": "user" // optional: 'user' or 'artist'
  }
  ```
- **Response:** `201 Created` with JWT cookies.

### `POST /api/auth/login`
Authenticates a user.
- **Auth Required:** No
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:** `200 OK` with JWT cookies.

### `POST /api/auth/logout`
Logs out a user and clears cookies.
- **Auth Required:** Yes (Access Token)
- **Response:** `200 OK`

### `POST /api/auth/refresh-token`
Refreshes an expired access token using the valid refresh token.
- **Auth Required:** Refresh Token (cookie or body)
- **Response:** `200 OK`

---

## Music & Streaming Routes

### `GET /api/music`
Fetches a list of all uploaded songs.
- **Auth Required:** Yes (Access Token)
- **Response:** `200 OK` - Array of song objects.

### `GET /api/music/stream/:id`
Streams a specific song via HTTP Range Requests (Proxy through Backend).
- **Auth Required:** Yes (Access Token)
- **Headers Needed:** `Range: bytes=0-`
- **Response:** `206 Partial Content` with binary audio stream.

### `POST /api/music/upload`
Uploads a new song and cover art to Cloudinary.
- **Auth Required:** Yes (Access Token)
- **Role Required:** `artist` or `admin`
- **Request Format:** `multipart/form-data`
  - `title` (text)
  - `audio` (file, max 50MB)
  - `coverArt` (file)
- **Response:** `201 Created`

---

## Socket.io Events
- **Connect:** URL matches backend server root.
- **`join_room`:** Pass a room ID to join.
- **`send_activity`:** Emits `receive_activity` to other listeners in the room.
