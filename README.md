# TaskBoard App 📝

A simple and efficient Task Management application built using the **MERN stack (MongoDB, Express, React, Node.js)** with authentication and task CRUD operations.

## 🚀 Features
- User authentication (Login/Register)
- Create, update, and delete tasks
- Mark tasks as **completed** or **incomplete**
- Toast notifications for user interactions
- Mobile-friendly UI

### Deployed Link  
🔗 [TaskBoard](https://taskboard-jet.vercel.app/)

## 🖼️ Screenshots
- **Task List View**  
  ![image](https://github.com/user-attachments/assets/4ddd615b-33af-4e38-a299-46e757576871)


- **Task Creation Modal**  
  ![image](https://github.com/user-attachments/assets/c1233b8f-ef8c-4267-8419-744ede925cfb)


- **Authentication Pages**
  | Signup page              | Login page              |
  | ---------------------- | ---------------------- |
  | ![image](https://github.com/user-attachments/assets/c9b4d335-ce5a-4e3c-a864-f25c61ea4dd8) | ![image](https://github.com/user-attachments/assets/f40acfec-172f-4865-b78c-c02ff5825730)
  

## 🖥️ Tech Stack
### Frontend:
- React.js with TypeScript
- TailwindCSS for styling
- Axios for API requests
- React Toastify for notifications

### Backend:
- Node.js with Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT) for authentication

## 📂 Project Structure
### Frontend:
```
└── src/
├── App.css
├── App.tsx
├── index.css
├── main.tsx
├── assets/
├── components/
│ ├── Modal.tsx
│ └── Navbar.tsx
├── pages/
│ ├── Login.tsx
│ ├── Signup.tsx
│ ├── TaskForm.tsx
│ ├── TaskList.tsx
│ └── Tasks.tsx
├── routes/
│ ├── ProtectedRoute.tsx
│ └── routes.tsx
└── services/
└── apis.ts
```

### Backend:
```
└── src/
├── index.js
├── config/
│ └── database.js
├── middlewares/
│ └── authentication.js
├── models/
│ ├── task.model.js
│ └── user.model.js
└── routes/
├── task.routes.js
└── user.routes.js
```

## 🔧 Installation & Setup

1. **Clone the repository:**
   ```sh
   git clonehttps://github.com/shivanijpatil/TaskBoard-Frontend.git
   cd TaskBoard-Frontend
   npm install
   ```
   ```sh
   git clone https://github.com/VrushabhVeer/Kazam-ev-backend
   cd TaskBoard-Backend
   npm install
   ```

2. **Set up .env files in backend (server):**
   ```sh
   MONGO_URI=your_mongodb_connection
   JWT_SECRET=your_secret_key
   ```
   Run the backend server:
   ```sh
   cd TaskBoard-Backend 
   npm run dev
   ```
   Run the frontend server:
   ```sh
   cd TaskBoard-Fronetend
   npm run dev
   Open http://localhost:5173 in your browser.
