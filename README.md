# Spring Boot Security Demo with JavaScript REST API

A modern Spring Boot Security application that demonstrates user management with a JavaScript-based Single Page Application (SPA) interface. This application has been transformed from a traditional server-side rendered MVC application to use REST APIs and client-side JavaScript for dynamic interactions.

## 🚀 Features

### **Modern SPA Architecture**
- **REST API Backend** - Clean separation between frontend and backend
- **JavaScript Frontend** - Dynamic user interface with no page reloads
- **Real-time Updates** - Tables and forms update instantly after operations
- **Bootstrap UI** - Modern, responsive design with modals and alerts

### **User Management System**
- **User Authentication** - Secure login with Spring Security
- **Role-based Access Control** - ADMIN and USER roles with different permissions
- **CRUD Operations** - Create, Read, Update, Delete users dynamically
- **Password Security** - BCrypt password encoding for secure storage

### **Admin Panel Features**
- **User Listing** - Dynamic table showing all users with roles
- **Add Users** - Modal form for creating new users
- **Edit Users** - In-place editing with modal forms
- **Delete Users** - Confirmation modals for safe deletion
- **Role Management** - Assign ADMIN or USER roles to users
- **Real-time Refresh** - Instant updates without page reload

## 🛠 Technology Stack

### **Backend**
- **Spring Boot 2.6.2** - Main application framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database operations
- **MySQL** - Database (configurable)
- **BCrypt** - Password encoding
- **Jackson** - JSON serialization/deserialization

### **Frontend**
- **Vanilla JavaScript (ES6+)** - Modern JavaScript without frameworks
- **Fetch API** - HTTP requests for REST API communication
- **Bootstrap 5** - UI framework for responsive design
- **HTML5** - Semantic markup
- **CSS3** - Styling and animations

### **Architecture**
- **REST API** - Stateless API endpoints
- **DTO Pattern** - Data Transfer Objects for API communication
- **Single Page Application** - Dynamic client-side rendering
- **Separation of Concerns** - Clear separation between frontend and backend

## 📁 Project Structure

```
src/
├── main/
│   ├── java/habsida/spring/boot_security/demo/
│   │   ├── configs/
│   │   │   ├── DataInitializer.java          # Database initialization
│   │   │   ├── SuccessUserHandler.java       # Login success handler
│   │   │   └── WebSecurityConfig.java        # Security configuration
│   │   ├── controller/
│   │   │   ├── AdminController.java          # Admin page controller
│   │   │   ├── HomeController.java           # Home page controller
│   │   │   ├── LoginController.java          # Login page controller
│   │   │   ├── RestAdminController.java      # Admin REST API
│   │   │   ├── RestUserController.java       # User REST API
│   │   │   └── UserController.java           # User page controller
│   │   ├── dto/
│   │   │   └── UserDTO.java                  # Data Transfer Object
│   │   ├── entity/
│   │   │   ├── Role.java                     # Role entity
│   │   │   └── User.java                     # User entity
│   │   ├── repository/
│   │   │   ├── RoleRepository.java           # Role data access
│   │   │   └── UserRepository.java           # User data access
│   │   ├── service/
│   │   │   ├── RoleService.java              # Role business logic
│   │   │   ├── UserDetailsServiceImpl.java   # User details service
│   │   │   └── UserService.java              # User business logic
│   │   └── SpringBootSecurityDemoApplication.java
│   └── resources/
│       ├── static/
│       │   ├── js/
│       │   │   ├── admin.js                  # Admin panel JavaScript
│       │   │   └── user.js                   # User profile JavaScript
│       │   └── images/                       # UI images
│       ├── templates/
│       │   ├── add_user.html                 # Add user page
│       │   ├── all_users.html                # Admin panel page
│       │   ├── login.html                    # Login page
│       │   └── user_user.html                # User profile page
│       └── application.properties            # Application configuration
```

## 🔧 REST API Endpoints

### **Admin API** (`/api/admin/**`)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/{id}` - Get user by ID
- `POST /api/admin/users` - Create new user
- `PUT /api/admin/users/{id}` - Update user
- `DELETE /api/admin/users/{id}` - Delete user
- `GET /api/admin/roles` - Get all roles

### **User API** (`/api/user/**`)
- `GET /api/user/profile` - Get current user profile

### **Security**
- **CSRF Disabled** - For REST API operations
- **Role-based Access** - ADMIN role required for admin endpoints
- **Authentication Required** - All endpoints require login

## 🚀 Getting Started

### **Prerequisites**
- Java 8 or higher
- Maven 3.6+
- MySQL database (or configure for your preferred database)

### **Database Setup**
1. Create a MySQL database
2. Update `application.properties` with your database credentials
3. The application will automatically create tables on startup

### **Running the Application**
```bash
# Clone the repository
git clone <repository-url>
cd project-prerequisite-3-1-2

# Build the project
mvn clean compile

# Run the application
mvn spring-boot:run
```

### **Access the Application**
- **Application URL**: `http://localhost:8080`
- **Login Page**: `http://localhost:8080/login`

### **Default Users**
- **Admin**: `admin@admin` / `admin` (ADMIN + USER roles)
- **User**: `user@user` / `user` (USER role only)

## 🎯 Usage Guide

### **Admin Panel** (`/admin`)
1. **Login as Admin** - Use admin credentials
2. **View Users** - See all users in a dynamic table
3. **Add User** - Click "New User" tab and fill the form
4. **Edit User** - Click "Edit" button on any user row
5. **Delete User** - Click "Delete" button with confirmation
6. **Refresh** - Click "Refresh" button to reload data

### **User Profile** (`/user`)
1. **Login as User** - Use any user credentials
2. **View Profile** - See your profile information
3. **Dynamic Loading** - Profile loads automatically via JavaScript

## 🔒 Security Features

### **Authentication**
- **Form-based Login** - Custom login page
- **Password Encoding** - BCrypt for secure password storage
- **Session Management** - Secure session handling

### **Authorization**
- **Role-based Access** - Different permissions for different roles
- **URL Protection** - Secure endpoints based on user roles
- **API Security** - REST endpoints protected by Spring Security

### **Data Protection**
- **Password Hashing** - Passwords never stored in plain text
- **JSON Security** - Sensitive fields excluded from JSON responses
- **Input Validation** - Server-side validation for all inputs

## 🎨 Frontend Architecture

### **JavaScript Classes**
- **AdminManager** - Handles all admin panel functionality
- **UserManager** - Handles user profile functionality

### **Key Features**
- **Dynamic Table Rendering** - JavaScript-generated user tables
- **Modal Forms** - Bootstrap modals for CRUD operations
- **Real-time Updates** - Instant UI updates after operations
- **Error Handling** - User-friendly error messages
- **Form Validation** - Client-side validation with server backup

### **API Communication**
- **Fetch API** - Modern HTTP requests
- **JSON Data** - Structured data exchange
- **Error Handling** - Graceful error management
- **Loading States** - User feedback during operations

## 🧪 Testing

### **Manual Testing**
1. **Login Testing** - Test with different user roles
2. **CRUD Operations** - Test all user management functions
3. **Security Testing** - Verify role-based access control
4. **UI Testing** - Test responsive design and interactions

### **API Testing**
- Use browser developer tools to inspect API calls
- Test endpoints with tools like Postman or curl
- Verify JSON responses and error handling

## 🔧 Configuration

### **Database Configuration**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### **Security Configuration**
- CSRF disabled for REST API
- Role-based URL protection
- Custom login page configuration

## 📝 Development Notes

### **Key Transformations**
1. **MVC to REST API** - Converted server-side rendering to REST endpoints
2. **Thymeleaf to JavaScript** - Replaced server-side templates with client-side rendering
3. **Form-based to AJAX** - Converted traditional forms to JavaScript API calls
4. **Page Reloads to SPA** - Eliminated page reloads for dynamic interactions

### **Best Practices Implemented**
- **Separation of Concerns** - Clear frontend/backend separation
- **RESTful Design** - Proper HTTP methods and status codes
- **Error Handling** - Comprehensive error management
- **Security** - Proper authentication and authorization
- **User Experience** - Smooth, responsive interactions

## 🎉 Success Criteria

✅ **REST Controllers** - Complete REST API implementation  
✅ **JavaScript Frontend** - Dynamic client-side functionality  
✅ **No Page Reloads** - Smooth SPA experience  
✅ **CRUD Operations** - Full user management capabilities  
✅ **Security** - Proper authentication and authorization  
✅ **Modern UI** - Bootstrap-based responsive design  
✅ **Error Handling** - Comprehensive error management  
✅ **Production Ready** - Clean, maintainable code  

This application successfully demonstrates the transformation from a traditional Spring MVC application to a modern JavaScript-based SPA with REST API backend, providing a smooth, dynamic user experience while maintaining security and functionality. 