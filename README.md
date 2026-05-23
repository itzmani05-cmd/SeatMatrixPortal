# SMPortal 

**SMPortal** is a full-stack **college application and document submission portal** designed to streamline student admissions and application management.

The platform supports **student authentication, phased application submission, document uploads with AWS S3 integration, admin verification workflows, and declaration PDF previews**, providing a seamless experience for both applicants and administrators.

## ✨ Features

### 👨‍🎓 College Features
- Secure user authentication
- Multi-phase application workflow
- Profile and application management
- Document upload and management
- Declaration PDF preview & download
- Real-time application tracking

### 👨‍💼 Admin Features
- Student application verification
- Document review and approval
- Application management dashboard
- Status monitoring and validation

### ☁️ File Management
- AWS S3 document storage
- Secure file upload handling
- Document retrieval and preview
- Multer-based upload middleware

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### File Storage
- AWS S3
- Multer

### Additional Tools
- JWT Authentication
- Winston Logger

---

## 📂 Project Structure

```bash
SMPortal/
│
├── client/                  # React frontend (Vite)
│
├── server/                  # Express backend
│   ├── config/              # Database & storage configs
│   ├── controller/          # Business logic
│   ├── middleware/          # Auth & upload middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── utils/               # Helpers & logger
│   └── uploads/             # Temporary uploads (if applicable)
│
├── package.json
└── README.md
```

---

## ⚙️ Prerequisites

Before running the project, ensure you have installed:

- Node.js **v18+** (Recommended: Latest LTS)
- MongoDB (Local or Atlas)
- npm or yarn
- AWS S3 Bucket Configuration

---

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/smportal.git
```

### 2. Navigate to the Project

```bash
cd smportal
```

---

## 📦 Install Dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd ../server
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the **server** folder:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

AWS_ACCESS_KEY_ID=your_access_key

AWS_SECRET_ACCESS_KEY=your_secret_key

AWS_REGION=your_region

AWS_BUCKET_NAME=your_bucket_name
```

## 🔒 Authentication

SMPortal includes:

- User Registration
- Login Authentication
- JWT-based Authorization
- Secure Protected Routes

---

## 📄 Application Workflow

1. User Registration/Login  
2. Multi-phase Application Submission  
3. Document Upload (AWS S3)  
4. Admin Verification  
5. Declaration PDF Preview  
6. Final Submission

---

## 📡 API Highlights

### Authentication
```http
POST /api/auth/register
POST /api/auth/login
```

### Applications
```http
GET /api/application
POST /api/application
PUT /api/application/:id
```

### Document Upload
```http
POST /api/upload
```

### Admin
```http
GET /api/admin/applications
PUT /api/admin/verify/:id
```

---

## ☁️ AWS S3 Integration

Documents are securely uploaded and stored using **AWS S3**.

Supported capabilities:
- File Upload
- Document Preview
- Secure Cloud Storage
- Document Retrieval

---
