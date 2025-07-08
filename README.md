# RestApiProject
# Node.js REST API: Dishes, Promotions, Leaders, and Comments

This is a RESTful API built using **Node.js**, **Express**, and **MongoDB**. It supports:

- User authentication and JWT-based authorization
- Admin-only access to create/update/delete dishes, promotions, and leaders
- Registered users can post, update, and delete their own comments

## 🔧 Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt for password hashing

## 📦 Endpoints Overview

### 🔐 Auth
- `POST /signup` - Register user
- `POST /login` - Login and get token

### 🍽️ Dishes
- `GET /dishes`
- `POST /dishes` (Admin)
- `PUT /dishes/:dishId` (Admin)
- `DELETE /dishes/:dishId` (Admin)

### 💬 Comments
- `POST /dishes/:dishId/comments` (User)
- `PUT /dishes/:dishId/comments/:commentId` (Only author)
- `DELETE /dishes/:dishId/comments/:commentId` (Only author)

### 🧑‍💼 Admin-only
- `GET /users` - Get all users

## 📄 Setup

```bash
npm install
