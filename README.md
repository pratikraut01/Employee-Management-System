# Employee Management System

**Java · Spring Boot · Hibernate/JPA · MySQL · React.js**

A full-stack application for managing employee records: create, view, update, delete and search employees, with separate **Admin** and **Employee** modules.

## Features
- RESTful API built with Spring Boot, CRUD via Spring Data JPA / Hibernate
- MySQL persistence with automatic schema generation
- Search by name, email, department or job title
- Bean validation + unique email check, with clear JSON error responses
- Responsive React.js UI (HTML, CSS, JavaScript)
- **Admin module:** add, edit, delete, search, view salary and hire date
- **Employee module:** read-only directory with search

## Project Structure
```
employee-management-system/
├── backend/    # Spring Boot (Maven) REST API
└── frontend/   # React (Vite) UI
```

## Prerequisites
- JDK 17+, Maven 3.8+
- Node.js 18+
- MySQL 8+ running locally

## Run Locally

### 1. Backend
Edit `backend/src/main/resources/application.properties` with your MySQL username/password (the `ems_db` database is created automatically).
```bash
cd backend
mvn spring-boot:run
```
API runs at `http://localhost:8080`.

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs at `http://localhost:5173`.

### Demo Logins
| Role     | Username   | Password   |
|----------|------------|------------|
| Admin    | `admin`    | `admin123` |
| Employee | `employee` | `emp123`   |

> The demo login is client-side only. For production, add Spring Security with JWT.

## REST API
| Method | Endpoint                         | Description                 |
|--------|----------------------------------|-----------------------------|
| GET    | `/api/employees`                 | List all employees          |
| GET    | `/api/employees?search=john`     | Search employees            |
| GET    | `/api/employees/{id}`            | Get one employee            |
| POST   | `/api/employees`                 | Create employee             |
| PUT    | `/api/employees/{id}`            | Update employee             |
| DELETE | `/api/employees/{id}`            | Delete employee             |

Sample body:
```json
{
  "firstName": "Jane", "lastName": "Doe", "email": "jane@example.com",
  "phone": "9876543210", "department": "Engineering", "jobTitle": "Developer",
  "salary": 65000, "hireDate": "2024-03-15"
}
```

## Future Improvements
Spring Security + JWT, pagination, Docker Compose, unit/integration tests.

## License
MIT
