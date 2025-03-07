# 👨‍⚖️ Wakelny - Lawyer & Client Platform

Wakelny is a web application designed to connect lawyers with clients. It allows users to register as lawyers or clients, browse profiles, and manage their accounts easily.

## 🚀 Features
- 🔐 User authentication with Firebase.
- 🏠 Home page displaying user options.
- 📝 Multi-step registration for clients and lawyers.
- ⭐ Add lawyers to favorites.
- ✍️ Reviews and ratings for lawyers.

---

## 🛠️ Technologies Used
- **React** + **Vite** 🚀 (for fast performance)
- **TypeScript** 📌 (for better code quality)
- **React Router DOM** 🏤️ (for navigation)
- **Firebase Authentication** 🔐 (for secure login)
- **React Toastify** 🔔 (for user notifications)
- **Tailwind CSS** 🎨 (for modern and responsive UI)

---

## 📺 Installation

### 1️⃣ Clone the repository:
```sh
git clone https://github.com/Asmaa63/Wakelny.git
cd Wakelny
```

### 2️⃣ Install dependencies:
```sh
npm install
```

### 3️⃣ Run the project:
```sh
npm run dev
```

💡 **Note**: If you prefer **Yarn** or **pnpm**, use:
```sh
yarn install && yarn dev
# or
pnpm install && pnpm dev
```

---

## 📌 Project Structure

```
src/
│── Components/
│   ├── Header/              # Header components
│   ├── Pages/               # Main pages
│   ├── User/                # Client registration
│   ├── Lawyers/             # Lawyer registration
│── FireBase/                # Firebase configuration
│── App.tsx                  # Main application entry
```

---

## 🛠️ Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project and add a **Web App**.
3. Copy the configuration details (`apiKey`, `authDomain`, ...).
4. Create a **`.env`** file in the root directory and add the following:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

---

## 🤝 Contributing
Contributions are welcome! You can:
- Open an **Issue** for any problems.
- Submit a **Pull Request** with improvements.
