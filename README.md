# AI Interview Portal

## Project Overview

AI Interview Portal is a web-based interview preparation and assessment platform developed using React, Vite, Spring Boot, and MySQL. The application enables students to practice mock interviews, take technical assessments, monitor performance, and track learning progress through analytics dashboards.

The system supports role-based access for Students, Trainers, and Administrators.

The application uses REST APIs for frontend-backend communication and JWT-based authentication for secure access to protected resources.

---

## Objectives

The objective of this project is to provide a role-based interview preparation and assessment platform where students can practice mock interviews, attempt assessments, track performance, and receive automated feedback.

Trainers can monitor student performance, while administrators can manage users, assessments, mock interviews, questions, and analytics.

---

## Features

### Authentication Module

* User Registration
* User Login
* Logout
* Forgot Password
* OTP-Based Email Verification
* Password Reset
* JWT Authentication
* Role-Based Access Control
* Protected Routes
* Session Persistence
* Session Expiration Handling
* Form Validation
* Secure Password Handling

### Student Module

* Student Dashboard
* Mock Interview Practice
* Technical Assessments
* Timed Assessments
* Automatic Result Calculation
* Assessment Results
* Mock Interview Results
* Analytics Dashboard
* Performance Tracking
* Profile Management
* Change Password

### Trainer Module

* Monitor Student Performance
* View Student Results
* Performance Reports
* Track Student Progress

### Admin Module

* User Management
* Assessment Management
* Assessment Question Management
* Mock Interview Management
* Mock Interview Question Management
* Performance Reports
* Admin Analytics

### Mock Interview Module

* React.js
* JavaScript
* Node.js
* Aptitude
* HR Interview
* Communication Skills
* Timed Mock Interviews
* Multiple Question Types
* Result Evaluation
* AI Feedback Simulation

### Assessment Module

* Online Assessments
* Timer-Based Exams
* Automatic Result Calculation
* Category-Wise Scoring
* Difficulty Levels
* Assessment History
* Assessment Results
* Question Management

### Analytics Module

* Weekly Score Trend
* Skill-Wise Performance
* Mock Interview Analytics
* Topic-Wise Improvement
* Completion Statistics
* Overall Performance
* Highest and Average Scores
* AI Performance Summary
* Strength Analysis
* Improvement Suggestions

### AI Integration

* Gemini API Integration
* Automated Answer Evaluation
* AI-Generated Feedback
* Confidence/Performance Evaluation
* Strength Identification
* Improvement Suggestions
* Interview Performance Summary
* Analytics-Based AI Feedback

---

## Technology Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* Redux Toolkit
* Tailwind CSS
* Recharts
* React Icons
* React Hook Form
* Yup

### Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* Maven
* JWT Authentication
* BCrypt Password Encryption
* REST APIs

### Database

* MySQL

### AI Integration

* Google Gemini API

### Storage

* MySQL for application data
* Local Storage for client-side authentication/session information

### Version Control

* Git
* GitHub

### Deployment

* Vercel

---

## Project Structure

### Frontend

```text
src/
│
├── assets/
├── components/
├── layouts/
├── pages/
├── routes/
├── redux/
├── services/
├── styles/
├── utils/
│
├── App.jsx
└── main.jsx