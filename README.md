# Ethiopian NID (Fayda ID) Integration -- Node.js + React (Vite)

This project demonstrates how to integrate the **Ethiopian National ID
(Fayda ID)** using **OIDC authentication** with a **Node.js backend**
and a **React + Vite frontend**.

It includes: - Secure OAuth2/OIDC login with Fayda ID - JWT-based
session handling (no long URLs) - Session store using
`express-session` - Frontend authentication flow with `axios` +
cookies - Complete example backend + frontend structure

------------------------------------------------------------------------

## 🚀 Features

-   Ethiopian NID (Fayda ID) OIDC authentication\
-   Secure JWT sessions stored on the server\
-   React frontend with auto-login after redirect\
-   Backend proxy `/me` endpoint\
-   Full `.env.example` file\
-   Safe private key authentication to Fayda ID

------------------------------------------------------------------------

## 📌 Project Structure

    project/
    │
    ├── backend/
    │   ├── app.ts
    │   ├── clientAssertion.ts
    │   ├── package.json
    │   ├── .env
    │   └── ...
    │
    ├── frontend/
    │   ├── src/
    │   │   └── Profile.tsx
    │   ├── vite.config.ts
    │   ├── package.json
    │   └── ...
    │
    └── README.md

------------------------------------------------------------------------

## ⚙️ Installation

### 1. Clone the repository

``` bash
git clone https://github.com/abduljebar49/Fayda-Integration
cd Fayda-Integration
```

------------------------------------------------------------------------

## 🛠 Backend Setup (Node.js)

### 1. Install dependencies

``` bash
cd backend
npm install
```

### 2. Create `.env` file from `.env.example`

    CLIENT_ID=
    REDIRECT_URI=http://localhost:3000/callback
    AUTHORIZATION_ENDPOINT=
    TOKEN_ENDPOINT=
    USERINFO_ENDPOINT=
    PRIVATE_KEY=
    EXPIRATION_TIME=15
    ALGORITHM=RS256
    CLIENT_ASSERTION_TYPE=
    SESSION_SECRET=your_strong_secret_key

### 3. Start backend

``` bash
npm run dev
```

Backend runs at:

    http://localhost:3000

------------------------------------------------------------------------

## 🖥 Frontend Setup (React + Vite)

### 1. Install dependencies

``` bash
cd frontend
npm install
```

### 2. Start frontend

``` bash
npm run dev
```

Frontend runs at:

    http://localhost:5173

------------------------------------------------------------------------

## 🔐 Authentication Flow

1.  User visits:

        http://localhost:3000/auth/login

2.  Redirects to Fayda ID login\

3.  After login, Fayda redirects to:

        http://localhost:3000/callback

4.  Backend:

    -   Verifies authorization_code\
    -   Fetches user info\
    -   Stores user session in server store\
    -   Redirects to frontend `/profile`

5.  Frontend requests user info:

    ``` bash
    GET /me  (cookie included)
    ```

------------------------------------------------------------------------

## 🧪 Testing

Visit:

    http://localhost:3000/auth/login

You should be redirected to Fayda ID login.

------------------------------------------------------------------------

## 🧾 License

MIT License

------------------------------------------------------------------------

## 🤝 Contributions

Pull requests are welcome!
