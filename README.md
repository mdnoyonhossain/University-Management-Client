# PH University Management System

## Overview
PH University Management System is a comprehensive platform designed to streamline academic and administrative tasks. It provides students, faculty, and administrators with a seamless experience for managing university operations efficiently.

## Features
- **Student Dashboard** with performance analytics (Chart.js)
- **User Authentication** & Role-Based Access Control (RBAC)
- **Course Management**: Enrollments, schedules, and progress tracking
- **Faculty Management**: Assignments, evaluations, and grading
- **Secure API Integration** with efficient data fetching
- **Admin Panel** for university-wide configurations
- **Optimized UI/UX** for an intuitive user experience

## Tech Stack
### Frontend:
- **React.js**, **Redux Toolkit**
- **Ant Design**
- **Chart.js** for data visualization

### Backend:
- **Node.js**, **Express.js**
- **Mongoose ODM**, **MongoDB**
- **JWT Authentication**, **Role-Based Access Control**

### DevOps & Tools:
- **Docker**
- **GitHub Actions** for CI/CD
- **Postman** for API testing

## Installation
### Clone the repository:
```sh
git clone https://github.com/mdnoyonhossain/University-Management-Client.git
cd ph-university
```

### Install dependencies:
```sh
npm install
```

### Setup Environment Variables:
Create a `.env` file in the root directory and add your configurations:
```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_BASE_URL=your_api_url
```

### Run the application:
```sh
npm run dev
```

## Usage
1. **Sign up** or **log in** with a registered account.
2. Access the **student dashboard** to track academic progress.
3. Faculty members can **manage courses and grades**.
4. Admins can **oversee the entire system** and manage users.

## Contributing
We welcome contributions! Please follow these steps:
1. **Fork** the repository
2. Create a **feature branch** (`git checkout -b feature-branch`)
3. **Commit changes** (`git commit -m "feat: Added new feature"`)
4. **Push** to your fork and create a **Pull Request**

---
Made with ❤️ by [Md Noyon Hossain](https://noyonhossain.vercel.app/)