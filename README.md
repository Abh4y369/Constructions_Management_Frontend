# 🏗️ Construction Project Management System

A simple full-stack **Construction Project Management System** built using the **MERN Stack**. This application allows authenticated users to manage construction projects by adding, updating, viewing, and deleting project records.

## Features

* User Authentication (Login & Register)
* JWT-based Authorization
* Add New Projects
* View All Projects
* Edit Project Details
* Delete Projects
* Project Status Management
* Budget and Timeline Tracking
* Basic Form Validation
* Responsive User Interface

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Axios
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

## 📂 Project Structure

```text
Frontend/
Backend/
```

## ⚙️ Installation

### Clone the Repository

```bash
git clone <your-repository-url>
```

### Backend Setup

```bash
cd Backend
npm install
npm start
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

## 📌 API Endpoints

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

### Projects

* GET `/api/projects`
* POST `/api/projects`
* PUT `/api/projects/:id`
* DELETE `/api/projects/:id`

## 📷 Screens

* Login
* Register
* Dashboard
* Add Project
* Edit Project

## 👨‍💻 Author

**Abhay**

---

This project was developed as part of a **Full Stack Developer Assessment** to demonstrate CRUD operations, JWT authentication, and responsive UI development using the MERN Stack.
