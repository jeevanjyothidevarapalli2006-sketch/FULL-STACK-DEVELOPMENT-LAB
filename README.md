# FSD-LAB – Full Stack Development Lab

A collection of practical experiments, applications, and projects developed as part of the Full Stack Development Lab. This repository demonstrates various concepts of frontend development, backend development, database integration, and full-stack application development.

The repository includes React applications, Node.js and Express.js backend services, MongoDB integrations, MVC architecture, authentication, and MERN stack development.

---

## ⚡ Deployment Guide

This guide explains how to deploy the frontend applications using Vercel and backend applications using Render.

### Step 1: Get the Code from GitHub

Clone the repository to your local system.

```bash
git clone https://github.com/AbhiDasari7/FSD-LAB.git
cd FSD-LAB
```

### Step 2: Deploy React Frontend Applications to Vercel

The frontend applications are deployed using Vercel.

**1. Login to Vercel CLI**

```bash
npm run login:vercel
```

Choose Continue with GitHub or Email and complete authentication in the browser.

**2. Deploy all configured React applications**

```bash
npm run deploy:vercel
```

The deployment script deploys the configured React applications separately and updates the local README with deployment URLs.

**3. View deployed projects**

```bash
npx vercel project ls
```

**Switching Vercel accounts:**

```bash
npm run logout:vercel
npm run login:vercel
```

### Step 3: Deploy Backend Applications to Render

Backend applications are deployed using Render Blueprint.

1. Open https://dashboard.render.com/
2. Sign in using your GitHub account.
3. Click **New + → Blueprint**.
4. Connect the GitHub repository: `AbhiDasari7/FSD-LAB`.
5. Render reads the `render.yaml` configuration file.
6. Review the configured backend services and environment variables.
7. Click **Apply** to start deployment.

Render automatically creates the services defined in the Blueprint configuration.

**Important:** Configure MongoDB connection strings and JWT secrets through Render environment variables. Never expose passwords, database credentials, or secret keys in public GitHub repositories.

### Step 4: Find Your Live Render URLs

After successful deployment:

1. Open your Render Dashboard.
2. Open the FSD-LAB Blueprint group.
3. Select the required backend service.
4. Copy its generated `.onrender.com` URL.
5. Use that URL to access and test the backend API.

Each deployed service receives its own URL.

---

## 🌐 Frontend Applications – Vercel

| No. | Experiment Name | Deployment Platform |
|---|---|---|
| 1 | React Conditional Rendering | Vercel |
| 2 | React Form Events | Vercel |
| 3 | React Frontend CRUD | Vercel |
| 4 | React HTML Render | Vercel |
| 5 | React JSX Render | Vercel |
| 6 | React Nested Components | Vercel |
| 7 | React Rendering Lists | Vercel |
| 8 | React State Events | Vercel |
| 9 | React Router | Vercel |
| 10 | MERN CRUD Frontend | Vercel |

---

## ⚙️ Backend Applications – Render

| No. | Application | Render Service |
|---|---|---|
| 1 | Products File Persistence | `file-persistent-app` |
| 2 | MongoDB Express | `mongodb-express-app` |
| 3 | MongoDB Mongoose Movies | `mongodb-mongoose-movies-app` |
| 4 | MVC Authentication | `mvc-auth-app` |
| 5 | MVC Express | `mvc-express-app` |
| 6 | Template Engine EJS | `template-engine-ejs-app` |
| 7 | Express Middleware API | `express-middleware-api` |
| 8 | MERN CRUD Backend | `mern-crud-backend` |

---

## 💻 Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- React.js
- JSX
- React Router

### Backend
- Node.js
- Express.js
- REST APIs
- MVC Architecture
- EJS Template Engine
- Middleware

### Database
- MongoDB
- Mongoose

### Deployment and Tools
- Git
- GitHub
- Vercel
- Render
- npm
- VS Code

---

## 📂 Project Structure

The repository contains multiple frontend and backend applications.

### Frontend Applications
- React Conditional Rendering
- React Form Events
- React Frontend CRUD
- React HTML Rendering
- React JSX Rendering
- React Nested Components
- React Rendering Lists
- React State and Events
- React Router
- MERN CRUD Frontend

### Backend Applications
- File Persistent Application
- MongoDB Express Application
- Mongoose Express Application
- MVC Authentication Application
- MVC Express Application
- EJS Template Engine
- Express Middleware API
- MERN CRUD Backend

---

## 🚀 Running an Application Locally

To run any individual application:

**Step 1: Navigate to the application directory**

```bash
cd path/to/application
```

**Step 2: Install dependencies**

```bash
npm install
```

**Step 3: Start the application**

For applications using the development script:

```bash
npm run dev
```

For applications using the start script:

```bash
npm start
```

Refer to the respective `package.json` file to check the available scripts.

---

## 💻 API Testing – CRUD Operations

The File Persistence API demonstrates CRUD operations using Node.js, Express.js, and JSON file storage.

### Faculty API

Base URL:

```text
https://YOUR-FILE-PERSISTENT-RENDER-URL
```

| Operation | HTTP Method | Endpoint | Purpose |
|---|---|---|---|
| Create | POST | `/api/v1/faculty` | Add a faculty member |
| Read All | GET | `/api/v1/faculty` | Retrieve all faculty |
| Read by ID | GET | `/api/v1/faculty/:id` | Retrieve faculty by ID |
| Update | PUT | `/api/v1/faculty/:id` | Update faculty details |
| Delete | DELETE | `/api/v1/faculty/:id` | Delete faculty |

### 1. CREATE – Add Faculty

```bash
curl -X POST https://YOUR-FILE-PERSISTENT-RENDER-URL/api/v1/faculty -H "Content-Type: application/json" -d '{"id":3,"name":"Dr.Kumar","department":"CSE","subject":"Java"}'
```

### 2. READ ALL – Get All Faculty

```bash
curl -X GET https://YOUR-FILE-PERSISTENT-RENDER-URL/api/v1/faculty
```

### 3. READ BY ID – Get Faculty by ID

```bash
curl -X GET https://YOUR-FILE-PERSISTENT-RENDER-URL/api/v1/faculty/3
```

### 4. UPDATE – Modify Faculty

```bash
curl -X PUT https://YOUR-FILE-PERSISTENT-RENDER-URL/api/v1/faculty/3 -H "Content-Type: application/json" -d '{"name":"Dr.Kumar","department":"AI & DS","subject":"Python"}'
```

### 5. DELETE – Remove Faculty

```bash
curl -X DELETE https://YOUR-FILE-PERSISTENT-RENDER-URL/api/v1/faculty/3
```

Replace the placeholder URL with your actual deployed Render service URL.

---

## 🌍 Deployment Platforms

| Application Type | Hosting Platform |
|---|---|
| React Frontend Applications | Vercel |
| Node.js Backend Applications | Render |
| Database | MongoDB Atlas |
| Source Code Management | GitHub |
