# 🚀 HireHelper-Batch3

## 💼 HireHelper – Smart Task Hiring Platform

HireHelper is a full-stack web application designed to connect users who need help with everyday tasks to those willing to complete them. The platform enables seamless task creation, request handling, and real-time updates, ensuring a smooth and efficient user experience.

The goal of HireHelper is to simplify task outsourcing by providing a structured system where users can post tasks, receive help requests, manage workflows, and stay updated through notifications.

---

## 📸 Platform Overview

![Landing](./screenshots/hirehelper.png)

The platform provides a clean and intuitive interface where users can easily navigate between task management, requests, and notifications.

---

# 🚀 Features & Milestones

---

## ✅ Milestone-1: Authentication System

A secure and reliable authentication system ensuring safe user access and account management.

### 🔐 Login Page

![Login](./screenshots/login.png)

### ✨ Features

* User registration with validation
* Strong password enforcement
* Email OTP verification system
* Resend OTP functionality
* Secure login using JWT authentication
* Protected routes for dashboard access
* Toast notifications for all user actions

---

## ✅ Milestone-2: Task Management & Feed System

This milestone focuses on core platform functionality — task creation and task discovery.

---

### 📌 Create Task

Users can create tasks by providing all necessary details including time, location, and optional image.

![Add Task](./screenshots/addTask.png)

#### Features:

* Task title and description
* Location input
* Start & end date/time selection
* Optional image upload (Cloudinary integration)
* Clean form UI

---

### 📰 Task Feed

Displays all available tasks posted by users.

![Feed](./screenshots/feed.png)

#### Features:

* Responsive grid layout
* Task cards with details
* Request button for each task
* Proper date & time formatting
* Clean UI with icons

---

### 📊 Dashboard Layout

Centralized dashboard for smooth navigation.

![Dashboard](./screenshots/dashboard.png)

#### Features:

* Sidebar navigation
* Header with search bar
* Notification icon
* Clean and minimal layout

---

### 📌 My Tasks

Users can view and manage their created tasks.

![My Tasks](./screenshots/myfeed.png)

#### Features:

* Task cards with image support
* Image fallback (blue background with task title)
* Location & time display
* Organized layout

---

## ✅ Milestone-3: Request System & Notifications

This milestone introduces interaction between users through requests and real-time updates.

---

### 🔄 Incoming Requests

Users receive requests from others for their posted tasks.

![Requests](./screenshots/request.png)

#### Features:

* View all incoming requests
* Accept / Reject actions
* Request details with user info
* Status indicators

---

### 📤 My Requests

Users can track the requests they have sent.

![My Requests](./screenshots/myRequest.png)

#### Features:

* Status tracking (pending / accepted / rejected)
* Task details inside request
* Clean card UI
* Real-time updates

---

### 🔔 Notifications System

Keeps users informed about important activities.

![Notifications](./screenshots/notification.png)

#### Features:

* Notifications for:

  * New request received
  * Request accepted
* Dropdown notification panel
* Unread badge indicator
* Mark as read functionality
* Smooth navigation on click

---

### ⚙️ Core Functional Highlights

* Prevent duplicate requests
* Cannot request own task
* Automatic UI updates
* Toast notifications instead of alerts
* Consistent UI across all pages

---

# 🔗 API Endpoints

### 🔹 Tasks

* `POST /api/tasks/create` → Create task
* `GET /api/tasks/allTasks` → Get all tasks
* `GET /api/tasks/myTask` → Get user tasks

### 🔹 Requests

* `POST /api/requests/send`
* `GET /api/requests/received`
* `GET /api/requests/myRequests`
* `PUT /api/requests/accept/:id`
* `PUT /api/requests/reject/:id`

### 🔹 Notifications

* `GET /api/notifications`
* `PUT /api/notifications/read/:id`

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Tailwind CSS
* React Router DOM
* Axios
* React Toastify
* React Icons

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Nodemailer
* Cloudinary
* Express FileUpload

---

# 📁 Folder Structure

```
HireHelper/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── utils/
│
├── screenshots/
```

---

# ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/springboard-mentor-batch13/HireHelper-Batch3.git
cd HireHelper-Batch3
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🔐 Environment Variables

Create `.env` file in backend:

```
MONGODB_URL=your_mongodb_url
PORT=4000

JWT_SECRET=your_secret

MAIL_USER=your_email
MAIL_PASS=your_email_password

CLOUD_NAME=your_name
API_KEY=your_key
API_SECRET=your_secret
```

---

# 🚧 Current Status

✔ Milestone-1 Completed
✔ Milestone-2 Completed
✔ Milestone-3 Completed

🚀 Currently working on **Milestone-4 (Advanced Features & Enhancements)**

---

## 📄 License

This project is open-source and available for learning and development purposes.

---
