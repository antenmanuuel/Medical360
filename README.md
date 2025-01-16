# Hospital Management System

A modern web-based hospital management system designed to manage patients, doctors, rooms, equipment, and resources efficiently. Built with React, Node.js, and MongoDB, it ensures a responsive and dynamic user experience with Material-UI, TailwindCSS, and real-time updates.

---

## Features

### Frontend
- Built with **React.js** and styled using **TailwindCSS** and **Material-UI**.
- Includes modern UI components like tables, forms, modals, and notifications.
- Features such as calendar integration (React Big Calendar) and date pickers for scheduling.

### Backend
- **Node.js** and **Express.js** handle the server-side logic and RESTful APIs.
- **MongoDB** with **Mongoose** for database operations and schema validation.
- Secure authentication with **JWT** and **bcrypt**.

### Additional Features
- Real-time updates with **Socket.IO**.
- Feedback and bug tracking.
- Notifications system for administrators and staff.

---

## Tech Stack

### Frontend
- **React.js**
- **Material-UI** and **TailwindCSS**
- **Axios** for API communication
- **React Toastify** for notifications
- **React Router** for navigation
- **Cypress** for testing

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Socket.IO**

### Other Tools
- **Vite** for fast development and building
- **Prettier** and **ESLint** for code formatting and linting
- **Cypress** for end-to-end testing
- **Day.js** and **Date-Fns** for date manipulation

---

## Installation

### Prerequisites
- **Node.js** (v14 or later)
- **MongoDB** (cloud instance)
- **npm** or **yarn**

---

### Steps

#### 1. **Clone the repository**
   ```bash
   git clone https://github.com/antenmanuuel/Medical360.git
   cd Medical360
   ```
#### 2. **Go the the client folder and install packages**
   ```bash
   cd client && npm install
   ```
#### 3. **Go to the server folder and install package**
   ```bash
   cd server && npm install
   ```
#### 4. **Create a .env file in the server**
   ```bash
    touch .env
   ```
#### 5. **Paste this into the .env file**
   ```bash
    JWT_SECRET="bc73f42fc7f4a452d56eeaaf12edf7ea6728e43d718bdcbebb4532e15c0eb76d"
   ```

#### 6. **Start the server**
   ```bash
    npm start
   ```

#### 7. **Start the client**
   ```bash
    cd .. && cd client && npm run dev
   ```


