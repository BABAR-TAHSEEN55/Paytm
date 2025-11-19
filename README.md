<div align="center">

# 🚀 SpeedyTm

**A Modern, Fast & Secure Digital Payment Platform**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

_Experience seamless money transfers with cutting-edge UI/UX design_

[✨ **View Demo**](#demo) • [📖 **Documentation**](#api-documentation) • [🚀 **Quick Start**](#quick-start)

</div>

---

## 🌟 **Overview**

SpeedyTm is a full-stack digital payment application that enables users to send and receive money instantly. Built with modern web technologies, it features a sleek glassmorphism UI, real-time notifications, and secure transaction processing.

### ✨ **Key Features**

- **💸 Instant Transfers** - Send money to anyone in seconds
- **📱 Request Money** - Create and manage payment requests
- **🔔 Real-time Notifications** - Live updates for all transactions
- **📊 Transaction History** - Complete audit trail with search
- **🎨 Modern UI/UX** - Glassmorphism design with smooth animations
- **🔐 Secure Authentication** - JWT-based auth with bcrypt encryption
- **📱 Responsive Design** - Perfect on desktop, tablet, and mobile
- **⚡ Lightning Fast** - Optimized performance and loading states

---

## 🏗️ **Tech Stack**

### **Frontend**

- **React 18** with TypeScript for type safety
- **Vite** for blazing-fast development
- **TailwindCSS** for utility-first styling
- **Framer Motion** for smooth animations
- **React Router** for navigation
- **Axios** for API communication
- **React Toastify** for notifications
- **Lucide React** for beautiful icons

### **Backend**

- **Node.js** with Express.js framework
- **TypeScript** for enhanced developer experience
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Zod** for input validation
- **CORS** enabled for cross-origin requests

---

## 🚀 **Quick Start**

### **Prerequisites**

- Node.js 18+ and pnpm
- MongoDB Atlas account or local MongoDB
- Git

### **Installation**

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/SpeedyTm.git
    cd SpeedyTm
    ```

2. **Backend Setup**

    ```bash
    cd backend
    pnpm install

    # Create environment file
    cp .env.example .env
    # Fill in your MongoDB credentials and JWT secrets
    ```

3. **Frontend Setup**

    ```bash
    cd ../frontend
    pnpm install
    ```

4. **Environment Configuration**

    ```bash
    # backend/.env
    MONGOD_USER=your_mongodb_username
    MONGOD_PASSWORD=your_mongodb_password
    PRIVATE_KEY=your_jwt_secret_key
    ```

5. **Start the Application**

    ```bash
    # Terminal 1 - Backend
    cd backend
    pnpm dev

    # Terminal 2 - Frontend
    cd frontend
    pnpm dev
    ```

6. **Access the Application**
    - Frontend: http://localhost:5173
    - Backend API: http://localhost:9000

---

## 📁 **Project Structure**

```
SpeedyTm/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── Components/      # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── InputBox.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ...
│   │   ├── Pages/           # Application pages
│   │   │   ├── SignUp.tsx
│   │   │   ├── SignIn.tsx
│   │   │   ├── UI.tsx       # Main dashboard
│   │   │   ├── Send.tsx
│   │   │   └── Navbar.tsx
│   │   ├── assets/          # Static assets
│   │   └── App.tsx          # Main app component
│   ├── public/              # Public assets
│   ├── package.json
│   └── tailwind.config.js   # Tailwind configuration
│
└── backend/                 # Node.js backend API
    ├── src/
    │   ├── controllers/     # Route handlers
    │   ├── models/         # Database models
    │   ├── middlewares/    # Custom middleware
    │   ├── services/       # Business logic
    │   ├── utils/          # Utility functions
    │   ├── schema/         # Zod validation schemas
    │   ├── index.ts        # Server entry point
    │   └── routes.ts       # API routes definition
    ├── config/             # Configuration files
    └── package.json
```

---

## 🔌 **API Documentation**

### **Authentication Endpoints**

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| `POST` | `/api/v1/user/signup` | Create new user account |
| `POST` | `/api/v1/user/signin` | User login              |

### **User Endpoints**

| Method | Endpoint               | Description             |
| ------ | ---------------------- | ----------------------- |
| `GET`  | `/api/v1/user/details` | Get user profile        |
| `GET`  | `/api/v1/user/bulk`    | Search users            |
| `GET`  | `/api/v1/user/balance` | Get account balance     |
| `GET`  | `/api/v1/user/history` | Get transaction history |

### **Transaction Endpoints**

| Method | Endpoint                           | Description            |
| ------ | ---------------------------------- | ---------------------- |
| `POST` | `/api/v1/user/transactions`        | Send money             |
| `POST` | `/api/v1/user/request`             | Request money          |
| `GET`  | `/api/v1/user/request`             | Get pending requests   |
| `GET`  | `/api/v1/user/request-to-response` | Accept payment request |

### **Example Request**

```javascript
// Send Money
POST /api/v1/user/transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 100,
  "to": "user_id_here"
}
```

---

## 🎨 **Design System**

### **Color Palette**

- **Primary**: Blue to Purple gradient (`from-blue-500 to-purple-500`)
- **Secondary**: Green to Teal gradient (`from-green-500 to-teal-500`)
- **Accent**: Purple to Pink gradient (`from-purple-500 to-pink-500`)
- **Background**: Dark gradient with glassmorphism effects

### **Typography**

- **Font**: Inter (Google Fonts)
- **Headings**: Bold with gradient text effects
- **Body**: Regular weight for optimal readability

### **Components**

- **Cards**: Glassmorphism with backdrop blur
- **Buttons**: Gradient backgrounds with hover animations
- **Inputs**: Glass effect with focus states
- **Animations**: Smooth transitions using Framer Motion

---

## 🔒 **Security Features**

- **🔐 JWT Authentication** - Secure token-based auth
- **🛡️ Password Hashing** - Bcrypt with salt rounds
- **✅ Input Validation** - Zod schema validation
- **🚫 CORS Protection** - Configured cross-origin policies
- **🔍 Error Handling** - Secure error messages

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by the Suho**

⭐ **Star this repo if you found it helpful!** ⭐

</div>
