# 💸 Simple MERN Wallet App

A full-stack wallet application built with **Express.js**, **JWT**, and **Mongoose** for the backend, and **React** for the frontend. Users can register, log in, check their account balance, and send money securely to other users.

---

## 📦 Tech Stack

- **Frontend**: React, Axios, Tailwind CSS (if used)  
- **Backend**: Node.js, Express.js, JWT, Mongoose  
- **Database**: MongoDB Atlas  
- **Other Tools**: bcrypt, dotenv, cors  

---

## ✨ Features

✅ User authentication (register & login) using JWT  
✅ Secure money transfer between users  
✅ Dashboard to view balance & user list  
✅ Protected routes using middleware  
✅ Responsive UI with reusable React components  
✅ MongoDB integration with Mongoose  

---

## 🧩 React Components

| Component         | Description                                    |
|--------------------|------------------------------------------------|
| `Appbar.jsx`       | Top navigation bar with logout                |
| `Balance.jsx`      | Displays user’s current account balance       |
| `Users.jsx`        | Shows list of users to send money             |
| `InputBox.jsx`     | Styled input field for forms                  |
| `Button.jsx`       | Reusable button component                     |
| `Header.jsx`       | Page title headers                            |
| `SubHeading.jsx`   | Small subheadings for forms                   |
| `BottomWarning.jsx`| Footer hints (e.g., “Already have an account?”)|

---

## 📄 React Pages

| Page            | Description                                  |
|------------------|----------------------------------------------|
| `Signin.jsx`     | Login page for existing users               |
| `Signup.jsx`     | Registration page for new users             |
| `Dashboard.jsx`  | Main user dashboard after login             |
| `SendMoney.jsx`  | UI to send money to selected users          |

---

## 📂 Folder Structure

```
mern-wallet-app/
├── backend/
│   ├── config.js
│   ├── db.js
│   ├── index.js
│   ├── middleware.js
│   ├── routes/
├── frontend/
│   ├── src/components/
│   │   ├── Appbar.jsx
│   │   ├── Balance.jsx
│   │   ├── Users.jsx
│   │   ├── ...
│   ├── src/pages/
│   │   ├── Dashboard.jsx
│   │   ├── SendMoney.jsx
│   │   ├── Signin.jsx
│   │   ├── Signup.jsx
│   ├── src/App.js
│   ├── public/
│   └── package.json
├── README.md
└── package.json
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file:
```
JWT_SECRET=your-secret-key
MONGO_URI=your-mongodb-connection-string
```

Run the backend:
```bash
node index.js
```

Backend runs at **http://localhost:3000**.

---

### 3️⃣ Setup Frontend
```bash
cd ../frontend
npm install
```

Create a `.env` file:
```
REACT_APP_API_URL=http://localhost:3000/api/v1
```

Run the frontend:
```bash
npm start
```

Frontend runs at **http://localhost:3001**.

---

## 🌐 API Endpoints

| Method | Endpoint                | Description            |
|--------|-------------------------|------------------------|
| POST   | `/api/v1/auth/register` | Register a new user    |
| POST   | `/api/v1/auth/login`    | Login user & get token |
| GET    | `/api/v1/account/balance`| Get user account balance|
| POST   | `/api/v1/account/transfer`| Transfer money to user|
| GET    | `/api/v1/users`         | Get list of users      |


---

## 📖 Learnings

This project helped me understand:  
- End-to-end MERN stack app development  
- JWT authentication & route protection  
- MongoDB schema design with user-account relationships  
- Building reusable frontend components in React  



