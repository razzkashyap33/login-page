# Modern Authentication App

A fully functional, production-ready MERN (MongoDB, Express, React, Node.js) stack application demonstrating a secure user authentication flow.

## 🚀 Features
- **Secure Authentication:** User registration, secure login, and password reset workflows.
- **Beautiful UI:** Fully responsive and modern design built with Tailwind CSS. Includes micro-animations powered by Framer Motion.
- **JWT Based:** Uses JSON Web Tokens (JWT) stored in HttpOnly cookies (or localStorage) for secure session management.
- **Monorepo Architecture:** Frontend and Backend live in the same repository for simplified version control and deployment.

## 🛠 Tech Stack
- **Frontend:** React, Tailwind CSS, Framer Motion, Axios, React Router.
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt.
- **Deployment:** Configured for seamless serverless deployment as a Monorepo on [Vercel](https://vercel.com).

## 💻 Local Development

1. Clone the repository to your local machine.
2. Install dependencies for both the frontend and the backend:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Create a `.env` file inside the `backend` directory with the following variables:
   ```env
   MONGO_CONN=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   PORT=8080
   ```
4. Start the development servers:
   - **Backend:** `cd backend && npm start` (Starts the API on port 8080)
   - **Frontend:** `cd frontend && npm start` (Starts the React app on port 3000)

## ☁️ Production Deployment (Vercel)

This project contains a root `vercel.json` file which automatically configures Vercel to host BOTH the React frontend (as a static build) and the Express backend (as serverless functions) on the **exact same domain**.

### Vercel Environment Variables Needed:
Add these to your project settings in the Vercel Dashboard:
- `MONGO_CONN`: Your production MongoDB connection string.
- `JWT_SECRET`: A secure random string for JWT signing.
- `NODE_ENV`: Set to `production`.

*(Note: Because the frontend and backend share the same domain on Vercel, the React app uses relative API paths. You **do not** need to set a `REACT_APP_API_URL` variable!)*