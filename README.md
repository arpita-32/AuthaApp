# User Authentication System

This project implements a user authentication system using Node.js, Express, MongoDB, and JWT for secure token-based authentication. The system includes functionality for user signup, login, role-based access control, and middleware for authentication and authorization.

## Features

- **Signup**: Allows new users to create an account with hashed passwords for security.
- **Login**: Authenticates existing users and generates a JWT token.
- **Role-Based Access Control**: Differentiates between "Student" and "Admin" roles.
- **Token-Based Authentication**: Secure user sessions using JSON Web Tokens (JWT).
- **Middleware**: Verifies tokens and enforces access control based on user roles.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for handling routes and middleware.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **bcrypt**: For hashing and verifying passwords.
- **jsonwebtoken (JWT)**: For generating and verifying tokens.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/repository-name.git
   cd repository-name
